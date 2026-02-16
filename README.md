# OpenSilverDevToolBox

OpenSilver 기반의 개발 도구 모음 프로젝트입니다. 주로 .NET 10을 타깃으로 하며, 개발 편의를 위한 소규모 유틸리티(예: `GuidGenerator`)들을 포함합니다.

주요 내용
- `GuidGenerator` 기능: GUID 생성기 및 관련 상태 관리를 담당하는 `GuidGeneratorStore.cs` 등

요구 사항
- .NET 10 SDK
- Visual Studio (권장: Visual Studio 2026 Insiders 또는 최신 버전)
- OpenSilver 관련 확장 또는 런타임(프로젝트가 OpenSilver를 사용하도록 구성된 경우)

빠른 시작
1. 저장소를 클론합니다:

   ```bash
   git clone https://github.com/lukewire129/DevToolBox.git
   cd DevToolBox
   ```

2. 솔루션 열기
   - Visual Studio에서 `OpenSilverDevToolBox.sln`을 엽니다.
   - 또는 명령줄에서 빌드:

   ```bash
   dotnet build
   ```

3. 실행
   - Visual Studio에서 시작 프로젝트를 선택 후 디버그/실행합니다.

프로젝트 구조(간단히)
- `OpenSilverDevToolBox/Features/GuidGenerator/` - GUID 생성 관련 코드
- (기타 기능은 폴더별로 정리되어 있습니다)

기여
- 이 저장소에 기여하려면 이슈를 열거나 풀 리퀘스트를 제출하세요.
- 코딩 스타일과 테스트를 유지하는 것이 좋습니다.

라이선스
- 프로젝트 루트의 `LICENSE` 파일을 확인하세요.

문의
- 저장소 이슈 트래커를 통해 문의해 주세요.
