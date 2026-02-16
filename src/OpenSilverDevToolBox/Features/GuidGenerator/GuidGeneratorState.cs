using System.Collections.Generic;

namespace OpenSilverDevToolBox.Features.GuidGenerator;

public record GuidGeneratorState(
    int SelectedVersion = 0,
    string? V5Input = null,
    GuidWrapper Wrapper = GuidWrapper.None,
    bool UseNoHyphen = false,
    bool UseUpperCase = false,

    string VersionDisplay = null,
    List<string>? Results = null
)
{
    public List<string> Results { get; init; } = Results ?? new ();
}
