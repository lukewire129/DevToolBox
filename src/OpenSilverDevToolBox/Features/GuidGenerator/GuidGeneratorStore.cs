using Knotty.Core;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace OpenSilverDevToolBox.Features.GuidGenerator;


public class GuidGeneratorStore : KnottyStore<GuidGeneratorState, GuidGeneratorIntent>
{
    public GuidWrapper Wrapper
    {
        get => State.Wrapper;
        set => State = State with { Wrapper = value };
    }

    public bool UseNoHyphen
    {
        get => State.UseNoHyphen;
        set => State = State with { UseNoHyphen = value };
    }

    public bool UseUpperCase
    {
        get => State.UseUpperCase;
        set => State = State with { UseUpperCase = value };
    }

    public GuidGeneratorStore() : base (new GuidGeneratorState ()) {
        UpdateCodeStudyArea (99999);
    }

    protected override async Task HandleIntent(GuidGeneratorIntent intent, CancellationToken ct)
    {
        if (intent is GuidGeneratorIntent.Generate)
            Generate ();
        else if (intent is GuidGeneratorIntent.ChangeVersion changeVersion)
        {
            UpdateCodeStudyArea(changeVersion.Version);
        }
    }
    private void Generate()
    {
        Guid raw = State.SelectedVersion switch
        {
            0 => CreateV1 (),
            2 => CreateV5 (State.V5Input),
            3 => CreateV7 (),
            _ => Guid.NewGuid ()
        };

        if (raw == Guid.Empty && State.SelectedVersion == 2)
            return;

        var formatted = FormatGuid (raw);

        State = State with
        {
            Results = new[] { formatted }
                .Concat (State.Results)
                .ToList ()
        };
    }

    private string FormatGuid(Guid guid)
    {
        string result;

        if (State.Wrapper == GuidWrapper.Braces)
            result = guid.ToString ("B");
        else if (State.Wrapper == GuidWrapper.Parentheses)
            result = guid.ToString ("P");
        else if (State.Wrapper == GuidWrapper.Urn)
            result = "urn:uuid:" + guid.ToString ("D");
        else
            result = guid.ToString (State.UseNoHyphen ? "N" : "D");

        result = State.UseUpperCase
            ? result.ToUpper ()
            : result.ToLower ();

        return result;
    }
    #region GUID v1 & v5 구현 (RFC 4122 기반)
    // [Study] v1: 시간과 노드ID의 조합
    private static byte[] _nodeId; // Wasm 환경이므로 가상의 Node ID 사용
    private Guid CreateV1()
    {
        byte[] bytes = new byte[16];

        // 1. 100나노초 단위의 틱 계산 (RFC 4122 기준: 1582년 10월 15일 기준)
        long ticks = DateTime.UtcNow.Ticks - new DateTime (1582, 10, 15).Ticks;

        byte[] timeLow = BitConverter.GetBytes ((uint)(ticks & 0xFFFFFFFF));
        byte[] timeMid = BitConverter.GetBytes ((ushort)((ticks >> 32) & 0xFFFF));
        byte[] timeHi = BitConverter.GetBytes ((ushort)((ticks >> 48) & 0x0FFF));

        if (BitConverter.IsLittleEndian)
        {
            Array.Reverse (timeLow);
            Array.Reverse (timeMid);
            Array.Reverse (timeHi);
        }

        // 2. 시간 배치 (Low-Mid-High)
        Array.Copy (timeLow, 0, bytes, 0, 4);
        Array.Copy (timeMid, 0, bytes, 4, 2);
        Array.Copy (timeHi, 0, bytes, 6, 2);

        // 3. Version 설정 (v1 = 0x10)
        bytes[6] = (byte)((bytes[6] & 0x0F) | 0x10);

        // 4. Clock Sequence (무작위 2바이트)
        byte[] clockSeq = new byte[2];
        RandomNumberGenerator.Fill (clockSeq);
        bytes[8] = (byte)((clockSeq[0] & 0x3F) | 0x80); // Variant 1
        bytes[9] = clockSeq[1];

        // 5. Node ID (가상의 6바이트 MAC 주소)
        if (_nodeId == null)
        {
            _nodeId = new byte[6];
            RandomNumberGenerator.Fill (_nodeId);
            _nodeId[0] |= 0x01; // Multicast 비트 설정 (실제 MAC과 구분)
        }
        Array.Copy (_nodeId, 0, bytes, 10, 6);

        return new Guid (bytes);
    }

    private Guid CreateV5(string name, string namespaceGuid = "6ba7b810-9dad-11d1-80b4-00c04fd430c8")
    {
        if (string.IsNullOrEmpty (name))
            return Guid.Empty;

        // 1. 기본 네임스페이스 GUID를 바이트 배열로 변환 (기본값은 DNS용 UUID)
        byte[] namespaceBytes = Guid.Parse (namespaceGuid).ToByteArray ();
        byte[] nameBytes = Encoding.UTF8.GetBytes (name);

        // 2. RFC 4122 규격에 따라 네임스페이스 바이트 순서 조정 (Big-Endian)
        SwapByteOrder (namespaceBytes);

        // 3. SHA1 해시 계산
        byte[] hash;
        using (var sha1 = SHA1.Create ())
        {
            sha1.TransformBlock (namespaceBytes, 0, namespaceBytes.Length, null, 0);
            sha1.TransformFinalBlock (nameBytes, 0, nameBytes.Length);
            hash = sha1.Hash;
        }

        // 4. 해시 결과물(20바이트) 중 16바이트만 사용
        byte[] newGuid = new byte[16];
        Array.Copy (hash, 0, newGuid, 0, 16);

        // 5. Version 설정 (0x50 = v5) 및 Variant 설정 (0x80)
        newGuid[6] = (byte)((newGuid[6] & 0x0F) | 0x50);
        newGuid[8] = (byte)((newGuid[8] & 0x3F) | 0x80);

        // 6. 다시 리틀 엔디언으로 돌려서 Guid 객체 생성
        SwapByteOrder (newGuid);
        return new Guid (newGuid);
    }

    // GUID 바이트 순서 뒤집기 (Endian 호환성용)
    private void SwapByteOrder(byte[] guid)
    {
        Swap (guid, 0, 3);
        Swap (guid, 1, 2);
        Swap (guid, 4, 5);
        Swap (guid, 6, 7);
    }

    private void Swap(byte[] b, int i, int j)
    {
        byte temp = b[i];
        b[i] = b[j];
        b[j] = temp;
    }
    #endregion

    #region Guid v7 구현 (시간 기반 + 랜덤)

    // --- 스터디용 로직 (v7 구현 예시) ---
    private Guid CreateV7()
    {
        var bytes = new byte[16];
        var ts = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds ();
        var tsBytes = BitConverter.GetBytes (ts);

        if (BitConverter.IsLittleEndian)
            Array.Reverse (tsBytes);
        Array.Copy (tsBytes, 2, bytes, 0, 6); // 48-bit timestamp

        RandomNumberGenerator.Fill (bytes.AsSpan (6));
        bytes[6] = (byte)((bytes[6] & 0x0F) | 0x70); // Set Version 7
        bytes[8] = (byte)((bytes[8] & 0x3F) | 0x80); // Set Variant

        return new Guid (bytes);
    }
    #endregion

    private void UpdateCodeStudyArea(int index)
    {
        string text = null;
        switch (index)
        {
            case 0: // v1
                text = @"// [Study] v1: Time + Node ID
// 100ns 단위의 Ticks와 가상의 MAC 주소 조합
long ticks = DateTime.UtcNow.Ticks - EpochTicks;
byte[] timeLow = BitConverter.GetBytes((uint)(ticks & 0xFFFFFFFF));
// ... (Reverse for Big-Endian)
// bytes[6] = (version | 0x10);";
                break;

            case 2: // v5
                text = @"// [Study] v5: Name-based (SHA1)
// 특정 이름(Name)을 해시하여 고유 GUID 생성 (결정적)
using (var sha1 = SHA1.Create()) {
    byte[] hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(name));
    // hash[6] = (version | 0x50);
}";
                break;

            case 3: // v7
                text = @"// [Study] v7: Unix Epoch + Random
// 앞 48비트에 타임스탬프를 넣어 정렬 가능하게 설계
long ts = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
byte[] bytes = new byte[16];
Array.Copy(BitConverter.GetBytes(ts), 2, bytes, 0, 6);
// RandomNumberGenerator.Fill(bytes.AsSpan(6));";
                break;

            default: // v4
                text = @"// [Study] v4: Pure Random
// 가장 대중적인 방식으로 .NET 기본 구현체 사용
return Guid.NewGuid();";
                break;
        }

        State = State with
        {
            VersionDisplay = text
        };
    }
}
