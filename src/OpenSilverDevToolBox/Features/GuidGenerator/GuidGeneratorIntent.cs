namespace OpenSilverDevToolBox.Features.GuidGenerator;

public abstract record GuidGeneratorIntent
{
    public record Generate : GuidGeneratorIntent;
    public record ChangeVersion(int Version) : GuidGeneratorIntent;
}
