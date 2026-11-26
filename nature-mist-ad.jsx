const { useMemo } = React;
const W = 1920, H = 1080;
const CREAM = '#F5EAD8', TERRA = '#C67139', SAGE = '#7A8A5E', DARK = '#201E1D', RED = '#E5482F', BLUE = '#6FA8FF';
const KR = "'Black Han Sans', sans-serif", BRAND = "'Caprasimo', serif", BODY = "'Gowun Dodum', sans-serif";

const prog = (T, s, e) => clamp((T - s) / (e - s), 0, 1);
const MOTION = {
  enter: (T, s, e) => Easing.easeOutCubic(prog(T, s, e)),
  whip: (T, s, e) => Easing.easeInOutQuart(prog(T, s, e)),
  pop: (T, s, e) => Easing.easeOutBack(prog(T, s, e)),
};
const lerp = (a, b, t) => a + (b - a) * t;

function humidity(T, C) {
  let v = lerp(60, 28, MOTION.enter(T, C.Hook + 0.2, C.Hook + 1.4));
  v = lerp(v, 52, MOTION.enter(T, C.Volcano + 1.6, C.Volcano + 2.2));
  v = lerp(v, 30, MOTION.enter(T, C.Cactus + 0.1, C.Cactus + 0.5));
  v = lerp(v, 55, MOTION.enter(T, C.Cactus + 1.3, C.Cactus + 1.9));
  return Math.round(v);
}

function Counter({ T, C }) {
  const v = humidity(T, C), dock = MOTION.whip(T, C.Volcano - 0.35, C.Volcano + 0.15);
  const out = MOTION.enter(T, C.Features - 0.2, C.Features);
  if (out >= 1) return null;
  const size = lerp(400, 76, dock), x = lerp(960, 1700, dock), y = lerp(520, 130, dock);
  const col = v < 40 ? RED : BLUE;
  return <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', opacity: 1 - out, display: 'flex', alignItems: 'center', gap: 16 * dock, padding: `${10 * dock}px ${26 * dock}px`, borderRadius: 999, background: `rgba(0,0,0,${0.35 * dock})`, whiteSpace: 'nowrap' }}>
    {dock > 0.5 && <span style={{ fontFamily: BODY, fontSize: 26, color: CREAM, opacity: (dock - 0.5) * 2 }}>습도</span>}
    <span style={{ fontFamily: BRAND, fontSize: size, lineHeight: 1, color: col }}>{v}%</span>
  </div>;
}

function Hook({ T, C }) {
  const h = C.Hook, a = MOTION.enter(T, h + 0.1, h + 0.6), b = MOTION.pop(T, h + 1.5, h + 1.8);
  const shake = T > h + 1.5 ? Math.sin((T - h) * 70) * 14 * Math.exp(-(T - h - 1.5) * 6) : 0;
  return <div style={{ position: 'absolute', inset: 0, background: DARK, transform: `scale(${1 + (T - h) * 0.02})` }}>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 230, textAlign: 'center', fontFamily: BODY, fontSize: 48, color: CREAM, opacity: a, transform: `translateY(${(1 - a) * 20}px)` }}>지금 우리 방 습도</div>
    {b > 0 && <div style={{ position: 'absolute', left: 0, right: 0, top: 760, textAlign: 'center', fontFamily: KR, fontSize: 140, color: RED, transform: `translateX(${shake}px) scale(${0.6 + 0.4 * b})`, opacity: Math.min(1, b * 2) }}>너무 건조해요</div>}
  </div>;
}

function Photo({ T, a, b, swapAt, x, y, size, born }) {
  const sw = MOTION.enter(T, swapAt, swapAt + 0.35), kb = 1 + (T - born) * 0.025;
  const pop = 1 + Math.sin(Math.PI * prog(T, swapAt, swapAt + 0.5)) * 0.05;
  const img = (src, op) => <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: op, transform: `scale(${kb})` }} />;
  return <div style={{ position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: 56, overflow: 'hidden', transform: `scale(${pop})`, boxShadow: '0 40px 90px rgba(0,0,0,0.35)' }}>{img(a, 1 - sw)}{img(b, sw)}</div>;
}

function Swap({ T, at, before, after, x, y, align = 'left' }) {
  const s = MOTION.enter(T, at, at + 0.4);
  const line = (t, i) => <div key={i} style={{ position: 'absolute', left: 0, right: 0, textAlign: align }}>{t}</div>;
  const blk = (d, op, dy) => <div style={{ position: 'absolute', inset: 0, opacity: op, transform: `translateY(${dy}px)` }}>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, textAlign: align, fontFamily: BODY, fontSize: 56, color: CREAM }}>{d.small}</div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 84, textAlign: align, fontFamily: KR, fontSize: 116, lineHeight: 1.1, color: d.color }}>{d.big.map((t, i) => <div key={i}>{t}</div>)}</div>
  </div>;
  return <div style={{ position: 'absolute', left: x, top: y, width: 860, height: 400 }}>
    {blk(before, 1 - s, -s * 40)}{blk(after, s, (1 - s) * 40)}
  </div>;
}

function Flash({ T, at }) { const f = 1 - prog(T, at, at + 0.25); return T >= at && f > 0 ? <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: f * 0.85 }} /> : null; }

function Volcano({ T, C }) {
  const V = C.Volcano, sw = V + 1.6, bgm = MOTION.enter(T, sw, sw + 0.4), e = MOTION.enter(T, V, V + 0.5);
  return <div style={{ position: 'absolute', inset: 0, background: bgm < 1 ? `linear-gradient(rgba(14,28,51,${bgm}), rgba(14,28,51,${bgm})), #2A0F0B` : '#0E1C33' }}>
    <Photo T={T} a="volRed.png" b="volBlue.png" swapAt={sw} x={1000} y={170} size={780} born={V} />
    <div style={{ position: 'absolute', inset: 0, opacity: e, transform: `translateX(${(1 - e) * -60}px)` }}>
      <Swap T={T} at={sw} x={130} y={330} before={{ small: '건조할 땐', big: ['화산처럼', '붉게'], color: RED }} after={{ small: '촉촉해지면', big: ['백두산처럼', '푸르게'], color: BLUE }} />
    </div>
    <div style={{ position: 'absolute', left: 130, top: 110, fontFamily: BRAND, fontSize: 34, letterSpacing: '0.08em', color: CREAM, opacity: e }}>VOLCANO MIST</div>
    <Flash T={T} at={V} /><Flash T={T} at={sw} />
  </div>;
}

function Cactus({ T, C }) {
  const K = C.Cactus, sw = K + 1.3, e = MOTION.enter(T, K + 0.2, K + 0.7);
  return <div style={{ position: 'absolute', inset: 0, background: SAGE }}>
    <Photo T={T} a="cacClosed.png" b="cacOpen.png" swapAt={sw} x={140} y={170} size={780} born={K - 0.4} />
    <div style={{ position: 'absolute', inset: 0, opacity: e }}>
      <Swap T={T} at={sw} x={1000} y={330} before={{ small: '건조할 땐', big: ['꽃봉오리를', '닫고'], color: DARK }} after={{ small: '촉촉해지면', big: ['꽃처럼', '활짝'], color: '#FFE6C7' }} />
    </div>
    <div style={{ position: 'absolute', left: 1000, top: 110, fontFamily: BRAND, fontSize: 34, letterSpacing: '0.08em', color: CREAM, opacity: e }}>CACTUS BLOOM</div>
    <Flash T={T} at={sw} />
  </div>;
}

const FEATS = [
  { big: '블루투스 연동', sub: '너무 습하면 제습기를 자동으로', bg: TERRA, fg: CREAM },
  { big: '음성 안내', sub: '습도가 바뀌면 말로 알려줘요', bg: SAGE, fg: CREAM },
  { big: '30dB 저소음', sub: '밤새 켜두어도 조용하게', bg: DARK, fg: CREAM },
  { big: '자동 전원 차단', sub: '물이 부족하면 스스로 꺼져요', bg: CREAM, fg: DARK },
];
function Features({ T, C }) {
  const F = C.Features, step = (C.End - F) / 4, i = clamp(Math.floor((T - F) / step), 0, 3), f = FEATS[i], s0 = F + i * step;
  const e = MOTION.whip(T, s0, s0 + 0.4), sub = MOTION.enter(T, s0 + 0.35, s0 + 0.8), drift = (T - s0) * 12;
  return <div style={{ position: 'absolute', inset: 0, background: f.bg }}>
    <div style={{ position: 'absolute', left: 130, top: 110, fontFamily: BRAND, fontSize: 30, color: f.fg, opacity: 0.8 }}>0{i + 1} / 04</div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', fontFamily: KR, fontSize: 170, color: f.fg, transform: `translateX(${(1 - e) * 500 - drift}px) skewX(${(1 - e) * -12}deg)`, filter: `blur(${(1 - e) * 10}px)` }}>{f.big}</div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 600, textAlign: 'center', fontFamily: BODY, fontSize: 52, color: f.fg, opacity: sub, transform: `translateY(${(1 - sub) * 20}px)` }}>{f.sub}</div>
  </div>;
}

function End({ T, C }) {
  const S = C.End, logo = MOTION.enter(T, S + 0.15, S + 0.65), sub = MOTION.enter(T, S + 0.5, S + 0.95);
  return <div style={{ position: 'absolute', inset: 0, background: CREAM }}>
    {logo > 0 && <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', fontFamily: BRAND, fontSize: 170, letterSpacing: '0.04em', color: DARK, opacity: logo, transform: `scale(${0.9 + 0.1 * logo})` }}>NATURE MIST</div>}
    {sub > 0 && <div style={{ position: 'absolute', left: 0, right: 0, top: 610, textAlign: 'center', fontFamily: BODY, fontSize: 48, color: DARK, opacity: sub }}>자연의 변화를 담은 감성 가습기 · 지금 만나보세요</div>}
  </div>;
}

function Ad() {
  const { T, CUES: C, authoredTotal } = useComposition();
  const whipV = MOTION.whip(T, C.Cactus - 0.25, C.Cactus + 0.2);
  const endFade = prog(T, authoredTotal - 0.3, authoredTotal - 0.02);
  return <div data-screen-label={`t=${Math.floor(T)}s`} style={{ position: 'absolute', inset: 0, background: DARK, overflow: 'hidden' }}>
    {T < C.Volcano + 0.2 && <Hook T={T} C={C} />}
    {T >= C.Volcano && T < C.Cactus + 0.3 && <div style={{ position: 'absolute', inset: 0, transform: `translateX(${-whipV * W}px)`, filter: whipV > 0 && whipV < 1 ? `blur(${Math.sin(Math.PI * whipV) * 16}px)` : 'none' }}><Volcano T={T} C={C} /></div>}
    {T >= C.Cactus - 0.25 && T < C.Features && <div style={{ position: 'absolute', inset: 0, transform: `translateX(${(1 - whipV) * W}px)`, filter: whipV < 1 ? `blur(${Math.sin(Math.PI * whipV) * 16}px)` : 'none' }}><Cactus T={T} C={C} /></div>}
    {T >= C.Features && T < C.End && <Features T={T} C={C} />}
    {T >= C.End && <End T={T} C={C} />}
    <Counter T={T} C={C} />
    <div style={{ position: 'absolute', inset: 0, background: DARK, opacity: endFade }} />
  </div>;
}

function NatureMistAd() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return <>
    <CompositionStage width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={DARK}><Ad /></CompositionStage>
    <TweaksPanel><TweakToggle label="Motion editor" value={t.motionEditor} onChange={v => setTweak('motionEditor', v)} /></TweaksPanel>
  </>;
}
window.NatureMistAd = NatureMistAd;
