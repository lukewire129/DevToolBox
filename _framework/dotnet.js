//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"c2435c3e0f46de784341ac3ed62863ce77e117b4",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "OpenSilverDevToolBox.Browser",
  "resources": {
    "hash": "sha256-b3racw6aEMG43V14SrKqFzZ4kJivdK5Vj1KPOX4nefM=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.b0gv4fbe2o.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.q5rqv3xrhm.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.a046i60q2q.wasm",
        "integrity": "sha256-ygMe2D75NmxkZgCb3VokZ6TWMr/7nQoq3kqheIAC5jo=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "integrity": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "integrity": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "integrity": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.0vf8u7rjdv.wasm",
        "integrity": "sha256-tDOwF9DpCu3dW1c2fC/DrhLT2kKWhY5KXOksyJURVpI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.8wwhk3t295.wasm",
        "integrity": "sha256-yJD7qA6X7+ZUxXtmPDTGgAXC4+USCVm0uIL23dI0zEA=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "Knotty.wasm",
        "name": "Knotty.ml9iv892zc.wasm",
        "integrity": "sha256-5k+cLS4UPGKOszCXil2ARHU3WWVuheSNSUr38qEDy3U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.27uh0dh29r.wasm",
        "integrity": "sha256-Hpe4nw3Ha/dJhLhD2XnlALzUEstYK94oIKY1LaVWxOA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.r9g1nqcelz.wasm",
        "integrity": "sha256-YZi/tF6ypI/FKQNWj7+4cZ6A/hlFW8sBdog9uAk20Eg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.mix9xafgp1.wasm",
        "integrity": "sha256-EtW9hGMY5MTO7caHEATVZStacJtAThrNg5tkY/arIGs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.mx3jv4l1ma.wasm",
        "integrity": "sha256-VsbElKPQde2ocjWpPHGKcpDgVA8YwRSlGvyI2jnJ34E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.9hvqdnyedj.wasm",
        "integrity": "sha256-I1V6RT2jU36RMO/udOCdtpwqRuricdlZ0IRsQvGrIKQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.vejc7kiu4g.wasm",
        "integrity": "sha256-R8Rvf+ufvlMX05PSWGUXwGm3hty6uCI9EtqBH2FpDIQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.b5r9igf1ej.wasm",
        "integrity": "sha256-UUwnFUGVKcfnwTDp5d2PPIYvZb3p3cZn9VEABGLlYu8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.3ajkzukr0v.wasm",
        "integrity": "sha256-m9k4pt1S3OsB7nhPn3Spu1JjG5ixGwaWDws5UBzaZjs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.utn63de0ak.wasm",
        "integrity": "sha256-ItW4Y6xe0HRBsQYWyldtmMAXhvzAxoe21ufeiPcPVF4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.zh7psstrkj.wasm",
        "integrity": "sha256-Nw6fMz9mMm8SS3pPrUsobEC9zzLKC6AKDJhHRldk9VA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.1kdc1oztmi.wasm",
        "integrity": "sha256-X78TdTgU/3Pd3qeRvD+qNMFWjhbxTXjduw5WXDir0JY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.ObjectPool.wasm",
        "name": "Microsoft.Extensions.ObjectPool.ojtr8l9akz.wasm",
        "integrity": "sha256-rKV5OsgPdT/dziClKx+rXomN3MiipX217V7XqBJvlts=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.2abh528mcf.wasm",
        "integrity": "sha256-WsA7Qa5Zv/QmtZqrIEQLYVSPd55Hdc1S+2J7y4JQBJ8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.vga3bvc9pt.wasm",
        "integrity": "sha256-QeF3pj2LH3LcaB6cg9nSyYQ6/Pf6RbTkLakVnAwVPXo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.nsfh695mwg.wasm",
        "integrity": "sha256-N8RKL2Eil4ZFxIkWa6Uig12+nRHOstda562q7GCs9fE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.opjjuvycl4.wasm",
        "integrity": "sha256-jMQY/dvs5uRhemYHS9FJ2U/551fHVVFNfoiVX8bIXQQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.at4tofna6k.wasm",
        "integrity": "sha256-Yp6F/C5xFSS+Z/idJ/8YQ6kM/46JHssrXe3uWkdrPxA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Browser.wasm",
        "name": "OpenSilver.Browser.wn8z56i07s.wasm",
        "integrity": "sha256-nDN/3wCbm0FmMsh4hicdOkdkGwZE5G8j3x1+ikBkPaQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Data.wasm",
        "name": "OpenSilver.Controls.Data.67p5wr6nb8.wasm",
        "integrity": "sha256-0poUbk0eogMR/D2izLyQOlDBsSrbwdLVwAtkwmFNog0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Data.DataForm.Toolkit.wasm",
        "name": "OpenSilver.Controls.Data.DataForm.Toolkit.l2964x91nv.wasm",
        "integrity": "sha256-besC7p4Ae5pYjyUrGUBRF2OfoefwDtoTqS9Z0NO9/nA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Data.Input.wasm",
        "name": "OpenSilver.Controls.Data.Input.od4r44i08g.wasm",
        "integrity": "sha256-7IKbqdMZWuI8rmXETWLtBC2Wq+gYXwp/I3wt4kuZnIQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Data.Toolkit.wasm",
        "name": "OpenSilver.Controls.Data.Toolkit.zdj8e8y3xz.wasm",
        "integrity": "sha256-2R3mMtnOuyn3Lq2w5IhpOzi3I3OeL9HmGKd5VW+wf9s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.DataVisualization.Toolkit.wasm",
        "name": "OpenSilver.Controls.DataVisualization.Toolkit.sgkqhcjjlk.wasm",
        "integrity": "sha256-HDu4cC9ffWpzzlT6XQwT50dA3nqSl/CAPq+TQcjz9pM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Input.Toolkit.wasm",
        "name": "OpenSilver.Controls.Input.Toolkit.o6ectnzuwr.wasm",
        "integrity": "sha256-MISk2Jekyg3YkoUdLmlcqoezydkLdQYEIFMKaxKFcl8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Input.wasm",
        "name": "OpenSilver.Controls.Input.w0qzi38ofu.wasm",
        "integrity": "sha256-gCxcmRlvYJ4gSHmDAmZPuhFzO+3I3FAp2uTln/vfQ3A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Layout.Toolkit.wasm",
        "name": "OpenSilver.Controls.Layout.Toolkit.4x08nrkuj4.wasm",
        "integrity": "sha256-WMbBnpfEKs7ELLVy4NfTfNm+lcst4uPBCjcmpMNz/hM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Navigation.wasm",
        "name": "OpenSilver.Controls.Navigation.jpo0x0llud.wasm",
        "integrity": "sha256-6TEYa98+p1HLSJz62Lv5xpL1YN8L1rf0Y4F9AGssCfI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Theming.Toolkit.wasm",
        "name": "OpenSilver.Controls.Theming.Toolkit.gy2gd99wnc.wasm",
        "integrity": "sha256-+PP+TS98P5A3MvX/0/UY1sS1p0BliuzTqjVnPHx99IU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Toolkit.wasm",
        "name": "OpenSilver.Controls.Toolkit.d3fhdt8wbb.wasm",
        "integrity": "sha256-qadVD1R8npkwYPhB94h3p35tmGrunLB8NAXZVGV8dR0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.wasm",
        "name": "OpenSilver.Controls.gccj54gvro.wasm",
        "integrity": "sha256-QDrea2LQOg5dNUqFBUaj4u9UimvjWDrFNst7sIrKFtU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Data.wasm",
        "name": "OpenSilver.Data.rhwha6up3v.wasm",
        "integrity": "sha256-vwBEq3yNFcYcRf5AI2MgLGz9LyUH8xSHJp9vEFcDTgg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Expression.Effects.wasm",
        "name": "OpenSilver.Expression.Effects.qlpf112brx.wasm",
        "integrity": "sha256-oqu2TWFfaXmxPs+hQrKVkRCkbusC4t9n5AUAZgX+vn0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Expression.Interactions.wasm",
        "name": "OpenSilver.Expression.Interactions.bg1pf4prev.wasm",
        "integrity": "sha256-Zd2fLVPy7Rb+unVqjLCoKf05LVDOdgNjt/BS4dDjjAw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Interactivity.wasm",
        "name": "OpenSilver.Interactivity.9fjw4o2xfb.wasm",
        "integrity": "sha256-VW48vD5r9hJ1FJHAJgEcBvMcJoftDC2UVmiiLtLjKTg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Themes.Modern.wasm",
        "name": "OpenSilver.Themes.Modern.lv61ds1nuc.wasm",
        "integrity": "sha256-7znDQFbiP8SH5NcdM5U61lJdSriBYpMmh3U1hg1uW9s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.WebAssembly.wasm",
        "name": "OpenSilver.WebAssembly.lkc4t50u7y.wasm",
        "integrity": "sha256-pQnanFgAlodmTmlZ9oHaFqYR4TJu9ULb5YWom/EInmA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.wasm",
        "name": "OpenSilver.ptthor3pg1.wasm",
        "integrity": "sha256-w3qHlzfk07XGG8Rd/cUuhA0cpL3UX3TThKMIRxp9JuY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilverDevToolBox.Browser.wasm",
        "name": "OpenSilverDevToolBox.Browser.dvmdv7rnve.wasm",
        "integrity": "sha256-CSBUCqR+fc1EUWy1Ee64jgE5SlY+iqKQh0ag2TUZdLY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilverDevToolBox.wasm",
        "name": "OpenSilverDevToolBox.9bk3ic0ndp.wasm",
        "integrity": "sha256-lUsos6cl/z4anQJOK3o1usP0mWSBNFs99P3XQ9MKmWs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.euln0m9xp9.wasm",
        "integrity": "sha256-qkka44gOIEuAOJz/GQ/02HinJw60dZ1pfRONQxZvyPU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.854yzesdrc.wasm",
        "integrity": "sha256-hLvHqipDE+rdkhGbyXcIq6QwRrwOotuSWKGsBMznWbw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.pp3c6rh074.wasm",
        "integrity": "sha256-M0BHmvGqnH7yNmjKe2w5PLR9Y7CxpjbHm8g1W9mWlis=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.zlicumvadp.wasm",
        "integrity": "sha256-N09mZVo3rRV/pVqPVS4eOFx/TPCbkjz0R0Yf9eig/oI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.njx1mnhmd3.wasm",
        "integrity": "sha256-7X1zLqDtSNWirEerGrRrWl0JRFaNAWqseBrY6+NGbdU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.niziwn65dq.wasm",
        "integrity": "sha256-sf/SN0AytIicWM/IuZlNnnHjqAOtECUmS35I3IQXdBI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.ocrzqp2g0p.wasm",
        "integrity": "sha256-OPOzlKyx/wwJfO0UFGt6xkHikB9JmtHT+iIkAgR0YsY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Composition.Initialization.wasm",
        "name": "System.ComponentModel.Composition.Initialization.yxnrt9p6im.wasm",
        "integrity": "sha256-Cj1Nn2+sxnPtcYYJCUcd2lLZ5+su2ygSwZhqZh7nxGk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Composition.wasm",
        "name": "System.ComponentModel.Composition.icmt9k6km8.wasm",
        "integrity": "sha256-Yu8NBJS2Eqh45MuVCw92ihg5vfkQ6WodkpucJbL+Rgg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.6u07u0xhev.wasm",
        "integrity": "sha256-/i3zVaoIpTkC/hwQOEFkk2haom+/qN+EAFeJc9vEf00=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.7sc9xwvxxc.wasm",
        "integrity": "sha256-9xmjrLEFYVMfE4P2p2N8pnTK5iFdeBHFCrion+Hcii0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.y7rkq3eotk.wasm",
        "integrity": "sha256-zuxulfCd0QMvHrChbpJ/1al7oYovaGgx/q3727Sp69Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.qls6em3p3t.wasm",
        "integrity": "sha256-Tiw+7ZyodPENZkg8KIuXoPRra6mZ/goo/qxZB+kusMw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.v2ttfagwvb.wasm",
        "integrity": "sha256-dw+0fPnpun9SlyqX2mgpxiOysUxmjjoqLicup76epT0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.5f2myvbjzl.wasm",
        "integrity": "sha256-wWPcNNDfZ/pt5aY8se/yLmfVZcpLfb+vkseoGrc5/Do=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.m9hiiswbgz.wasm",
        "integrity": "sha256-6ikv0HaMFucWCMRodJURCcBynZp2zzn+uJvAngQkIfg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.hmbngkil2y.wasm",
        "integrity": "sha256-mdpzQ4U4YpFwbaxsCMDesXPE5anLcl9cIiFrOdFZICU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.4c75w8eg28.wasm",
        "integrity": "sha256-ZNRFCqF+6scDiAv4HdpIAG9MsQTjIhb+QzIEAak4T/4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.vc3mfrxf21.wasm",
        "integrity": "sha256-gbqjwLFnRmK715Rlbw5m8VKn4lw7wx8tUdle5nG5DrQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.9qaqu742vw.wasm",
        "integrity": "sha256-Ly36i3f+Ctb/Vtf0DrtbrBrUXqIXOQwnPnxNcQk8YNA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.zn3zrwfe2r.wasm",
        "integrity": "sha256-sRfXsXtfMMTo2CLx4ZKDFwtkYvOe/IRL5Gwf4dsnXMk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.orwcdf2bqi.wasm",
        "integrity": "sha256-5NlyiKMjQMJVLZ+E92VHzP4NXkvjJnT4LTZkWqm0KJc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.rmxg3w4erl.wasm",
        "integrity": "sha256-QzGgW0+MWgRhPWaMd9XSxlwhrvTD7YuXY8uqOZR8FkI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.2rouhv5oe2.wasm",
        "integrity": "sha256-MkpFeNVnNB6buXv9jP4r1D2gibthpsn+z2X3AiGFmdc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.jh57m47erx.wasm",
        "integrity": "sha256-h20jvaedevVXX0JcxRyBMYDahMhaJJmU1ULbDdCE5xY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.gzandfwyc0.wasm",
        "integrity": "sha256-XOBvwXWapYlieVtascdnY138I0ZvMi/W/cFzjK3wSsE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.82gn07g7rv.wasm",
        "integrity": "sha256-8BK5La4PhEKNgmtYvV8eIgyq/ryQ10zrnPOZbw6woVs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.luoznnu581.wasm",
        "integrity": "sha256-jbvyEtu54W1ydK69sqLEObJj9cXrohPuo2F2j+vASpI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.2jaqwx49m8.wasm",
        "integrity": "sha256-znvYmqqJEo4nkDDIL9zyK9qPwYRN0tDbLiPrYbRJVRc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.ftn4313j60.wasm",
        "integrity": "sha256-bTdjaxpmUxO7c+VjdLJV9xDrrjfO0BvqbA9CkoCkZhM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.es409ve7hn.wasm",
        "integrity": "sha256-wsJL3YAwotG1pxUUTdK9y1DqCOCsPqcHPpL++9xJMoA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.1tn2v5a0dc.wasm",
        "integrity": "sha256-+8cKlUm072GYVjgNmuvAmYe4H/wyQ3Zl3K6opPCPDQY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.wk4qst5a68.wasm",
        "integrity": "sha256-sJmUf+aN1bF3JG+B2I/+xAgFiZ+c/6pqOEv+BlP8C4Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.cu3x58u2gf.wasm",
        "integrity": "sha256-tDbJqEpxJMMOq8OQFnxj1P2oucePKbRZYHAcjH4O8XU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.3gumu9lypk.wasm",
        "integrity": "sha256-XUqVTAMXG5SYFDPfWjw08/l01UKm7lvkKXIagbQk3lc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.qk2qjoypo3.wasm",
        "integrity": "sha256-dr0u/tAjJ9+rJYGKKHqRPaAgsumn4nluoRpnFdvO/Yk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.idfph2rlpx.wasm",
        "integrity": "sha256-6vxl5fsgkmLvXnut/jZsobKCWt2iE+LrXV8u5cyU29E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.3bi1xbmoov.wasm",
        "integrity": "sha256-EcC2FNvaiMfb1Qrxwdk8YSluMyjmEtWOsvEWlW74USg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.ffvu6crlqb.wasm",
        "integrity": "sha256-ZZ8Yl+tzEDXUuAnCPVKMYQ3olBU48bipKbHLrw78TnI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.svhow4qlbm.wasm",
        "integrity": "sha256-iADWFUw47yMTPnQFxGKTmG2DeeXj126zmOHAhJZ9cKA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.xz62hrvms1.wasm",
        "integrity": "sha256-7fxQRWMlzDZacsqgfD0kpxfG0yPKuBfZfB+7BnWcMh8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.nsfubnmzhb.wasm",
        "integrity": "sha256-d3K/0sOH7IpBeQB9qj98KMmsPZy9QPcDIJxaT7Gw7LE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.r5hbfplfyy.wasm",
        "integrity": "sha256-YVGxZF6uOx7IwRVRe8N5862RvV3xHj/8MeQCnydjvPQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.wjkxqr2ie3.wasm",
        "integrity": "sha256-TCxaAiGzItx62UVCTIl675Smx0zM9f8ehZOfZKI5ykU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.l5uyvtahci.wasm",
        "integrity": "sha256-KcDEpUTmJsdWVtYY4NzBArXvXkHZH2AtULw0DF6JViU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.5r3l847i9v.wasm",
        "integrity": "sha256-QY61zLwOVsQqbWrD8U2v6b1vZ+eX3u0yVIdUvAv7Bw8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.c31txyycqb.wasm",
        "integrity": "sha256-OKzy312rBKS7hRr5Ow9znjAbUoWt8SRmUINkK3pwD/Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.bqqd4pecym.wasm",
        "integrity": "sha256-bc992MlguWHdb1BccSiCer01+DzshnEcgQAvusxkVxY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.80z9kggs2a.wasm",
        "integrity": "sha256-eO37x9v5FxdnGrnYR2xMFx1gs/iMgnMGTjfQ/LTaPxM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.syfo04b4w4.wasm",
        "integrity": "sha256-1KZKQ8OECBcV1elYAJe4B3ULcd2sudo3dvoI2+hxWo8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.3eipjdgv2t.wasm",
        "integrity": "sha256-WzB0cMPofOBtkn903MrWzagOjGwK1P/389yeOcb/9Co=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.7j5iafqope.wasm",
        "integrity": "sha256-fY1kWbPSIOncf25P58v1UkIOLpC6ivzb1NQctE9VJfw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Pkcs.wasm",
        "name": "System.Security.Cryptography.Pkcs.fpr05ucg91.wasm",
        "integrity": "sha256-Q6m1WVgacAFr3zXtnGXlpVc6nIMtiTGKzj5H47IrXds=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Xml.wasm",
        "name": "System.Security.Cryptography.Xml.a7ehdxlqz4.wasm",
        "integrity": "sha256-2nxlBo4SkjueaARWxO2aKeDWzsZVSCZCxQ9Gfe35tjI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.4ujx12r1zi.wasm",
        "integrity": "sha256-rLuWQWmDsaMqTj7GhgXXaSqF9Blo7iqMbGw29j9eGg8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.xvuuxyv3p4.wasm",
        "integrity": "sha256-3TBk+bgtID8SfIF2Dby8VlHbJpnBmNYlq3qie0P9AAM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.wasm",
        "name": "System.ServiceModel.3dk0gfdu13.wasm",
        "integrity": "sha256-F2OmgVYoVKp5oHZdWMWo2O7Z+Wvr1JWNeT+pZQAGRK4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Duplex.wasm",
        "name": "System.ServiceModel.Duplex.hccdd63tc3.wasm",
        "integrity": "sha256-wfRorSMSt9wIaS9zk7pYl/e2It/TZfdmPhk1+scMSRs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Primitives.wasm",
        "name": "System.ServiceModel.Primitives.874s3i2p9d.wasm",
        "integrity": "sha256-vDAA10tGmlzJj7xBew1hL/SR9MmKhY/RZE+wGxwVAqw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Security.wasm",
        "name": "System.ServiceModel.Security.8pkegjgj07.wasm",
        "integrity": "sha256-TFy6toELDkw0m7PVdpXroCdXUOp+5tVGcxpHBmXbYrM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.gwksaqyl68.wasm",
        "integrity": "sha256-MFV1rWqnq/S/AtEdCoyvydacYIxU2Sajb1ETJ+dT8Bk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.m17bqahssz.wasm",
        "integrity": "sha256-ljU8j64iyxWqz2zTKP1bs/iWpFS+2Ik3ly4xLscjUg0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.6afpwzyaqb.wasm",
        "integrity": "sha256-YrrgIBYDtHbsSdeuaWIM/4FUa5CMbY9w8/41FI7Fw5c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.tsp1gm3ewj.wasm",
        "integrity": "sha256-3RDmfspx5yEYoeu4iKMXcgTfOkgVv0T4QaXomRnzDLg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.uqzq4vcviq.wasm",
        "integrity": "sha256-dhfcmH4CJD5x/aVaqzx1YqdGrhZQjwCBAfjceFrTICg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.37c2lwif1n.wasm",
        "integrity": "sha256-Pz/SuM9+ijI/aygikLUAeqA0/dWZcPEwUQQ7FQrPgZY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.yryjhm2v3j.wasm",
        "integrity": "sha256-MiB9wfLpmIbek2Iv3jHXZbyzQD4k379aAHkGIg0dlyc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.og7j3hwnkb.wasm",
        "integrity": "sha256-eMzG+3zSEaHDq6pUbfTV39GW9Jr1umH2sdiloSZpVyk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.ljlol5lijn.wasm",
        "integrity": "sha256-70PTFJ4N0UKqLGsGmljLlRuEmanjT9whofuP9mQJtdU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.pjzilfik0i.wasm",
        "integrity": "sha256-dXW7tgyNezxtPQrZxHR99mBR8VtGIJx0FYrZRuXW4CI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.ysq4rzz6yg.wasm",
        "integrity": "sha256-sndSZhomaMgZJSV8YYnGu9JTyssQJWIyipDAPAgJbwQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.h4gyp5qe8y.wasm",
        "integrity": "sha256-IZNdEvtkPE5xxpu28W283/qww+e8TOmxreMa62z+KnM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.auuhb8kvmv.wasm",
        "integrity": "sha256-nj7bNI0J0qiUGRnfaNmT8XXHoeT53ELMph/TCTxQfy0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.deed694j9w.wasm",
        "integrity": "sha256-JRSnUKU4RCZCvwQXVaK87jabHPSnQK1daxG24xvCico=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.x4gd3lg59y.wasm",
        "integrity": "sha256-D9ZgH4SEifmcjncp9wYz76HjVSfCjrOm2kbvNHbKe0A=",
        "cache": "force-cache"
      }
    ],
    "satelliteResources": {
      "cs": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.s00x267f4t.wasm",
          "integrity": "sha256-XMiBldUyQNQ15Yp4GygwYMMc7uvGQNNOQI1NcB4f9rA=",
          "cache": "force-cache"
        }
      ],
      "de": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.wztnq3dud7.wasm",
          "integrity": "sha256-nI2TQgsJpyJvoXqmw4GQrSr7wogxytgEIssI9AIk5Go=",
          "cache": "force-cache"
        }
      ],
      "es": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.9x9e8vpihg.wasm",
          "integrity": "sha256-Q+IEo6Y3ep+Yq3dGoNv+dONx+vbGjZWxMpZXpRNErfI=",
          "cache": "force-cache"
        }
      ],
      "fr": [
        {
          "virtualPath": "OpenSilver.resources.wasm",
          "name": "OpenSilver.resources.b0oyd1ufko.wasm",
          "integrity": "sha256-Cx8uNmmP8Ihhmn5hhQlYDxhauwZZx3YYRo4biFAGSgQ=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.uzoepk1yy0.wasm",
          "integrity": "sha256-Co/FgGAC4oUBaOKCXGTGERxAzccQSoSd+jDV0zItEpE=",
          "cache": "force-cache"
        }
      ],
      "it": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.e41641zc7p.wasm",
          "integrity": "sha256-0ly1hwxOhX6jfe9mrhfFbRGKqs0Ao6OSmKyM2gdfH04=",
          "cache": "force-cache"
        }
      ],
      "ja": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.fghrqu9dyr.wasm",
          "integrity": "sha256-H/PbAf6lMFRWbAzP4VrVN4xyjvYyh7pt2XQF6OEbg7Q=",
          "cache": "force-cache"
        }
      ],
      "ko": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.0cs11t3wro.wasm",
          "integrity": "sha256-sKrfI/t4WFEyUpMbJqoXmsNl2qIklGhRBtQHihYPuFA=",
          "cache": "force-cache"
        }
      ],
      "pl": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.8222gwpw0f.wasm",
          "integrity": "sha256-EGnjR8wzoYLA94FezkPhtrxiB5zj6LMfpt+LUTxPg04=",
          "cache": "force-cache"
        }
      ],
      "pt-BR": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.nv8fwc9o65.wasm",
          "integrity": "sha256-TcWpMeSDQCudiVBR8gxSc2WeRx/CzvGXfp0/KANOe3g=",
          "cache": "force-cache"
        }
      ],
      "ru": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.r2qyztjans.wasm",
          "integrity": "sha256-fQAeCI4Ux+XEPUlsPnMTjYRqiVhEV3VSdvFu4B+xccY=",
          "cache": "force-cache"
        }
      ],
      "tr": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.b75mifghxb.wasm",
          "integrity": "sha256-KQ7TB8xv6BnAxA5XaAVUP5WoB2eEuYjizjh4Ew8a0/4=",
          "cache": "force-cache"
        }
      ],
      "zh-Hans": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.jnq9wrnhmd.wasm",
          "integrity": "sha256-LwvRZb/jSDArVpFuoD8j9aYTApLXu0MxCequtiTza3g=",
          "cache": "force-cache"
        }
      ],
      "zh-Hant": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.8ge731imjt.wasm",
          "integrity": "sha256-6GuM+M9LJmtIM7VtFIqePOfYhcffkCwdNBfvwWYc2wc=",
          "cache": "force-cache"
        }
      ]
    }
  },
  "debugLevel": 0,
  "linkerEnabled": true,
  "globalizationMode": "sharded",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false,
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
