"use client";

import { useMemo, useState } from "react";

type Spot = {
  id: string;
  name: string;
  country: string;
  x: number;
  y: number;
  tag: string;
  icon: string;
  season: string;
  temp: string;
  current: string;
  visibility: string;
  wildlife: string[];
};

const spots: Spot[] = [
  { id: "raja", name: "四王群岛", country: "印度尼西亚", x: 78, y: 63, tag: "珊瑚与微距", icon: "🐋", season: "10月 — 次年4月", temp: "28–30°C", current: "中等 · 示例", visibility: "15–30m", wildlife: ["魔鬼鱼", "鲸鲨", "豆丁海马", "杰克鱼群"] },
  { id: "cocos", name: "科科斯岛", country: "哥斯达黎加", x: 24, y: 58, tag: "锤头鲨", icon: "🦈", season: "6月 — 11月", temp: "24–28°C", current: "强 · 示例", visibility: "12–25m", wildlife: ["锤头鲨", "鹰鳐", "海豚", "鲸鲨"] },
  { id: "socorro", name: "索科罗群岛", country: "墨西哥", x: 18, y: 43, tag: "巨型魔鬼鱼", icon: "🛸", season: "11月 — 次年5月", temp: "21–27°C", current: "中强 · 示例", visibility: "15–35m", wildlife: ["巨型魔鬼鱼", "座头鲸", "海豚", "锤头鲨"] },
  { id: "galapagos", name: "加拉帕戈斯", country: "厄瓜多尔", x: 28, y: 62, tag: "海洋生物", icon: "🐢", season: "6月 — 11月", temp: "18–25°C", current: "强 · 示例", visibility: "10–25m", wildlife: ["鲸鲨", "海鬣蜥", "锤头鲨", "翻车鱼"] },
  { id: "maldives", name: "马尔代夫", country: "马尔代夫", x: 63, y: 57, tag: "礁鲨与魔鬼鱼", icon: "🐟", season: "1月 — 4月", temp: "27–30°C", current: "中强 · 示例", visibility: "20–40m", wildlife: ["鲸鲨", "魔鬼鱼", "灰礁鲨", "海龟"] },
  { id: "redsea", name: "红海兄弟岛", country: "埃及", x: 56, y: 43, tag: "远洋鲨鱼", icon: "🦈", season: "9月 — 11月", temp: "24–29°C", current: "中强 · 示例", visibility: "25–40m", wildlife: ["长尾鲨", "远洋白鳍鲨", "双髻鲨", "梭鱼群"] },
  { id: "ningaloo", name: "宁格鲁礁", country: "澳大利亚", x: 81, y: 73, tag: "鲸鲨", icon: "🐋", season: "3月 — 7月", temp: "24–28°C", current: "温和 · 示例", visibility: "15–30m", wildlife: ["鲸鲨", "座头鲸", "魔鬼鱼", "儒艮"] },
];

const monthShort = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
const sampleWindows: Record<number, string[]> = { 1: ["raja", "maldives", "socorro"], 2: ["raja", "maldives", "socorro"], 3: ["raja", "maldives", "socorro", "ningaloo"], 4: ["raja", "maldives", "socorro", "ningaloo"], 5: ["socorro", "ningaloo"], 6: ["cocos", "galapagos", "ningaloo"], 7: ["cocos", "galapagos", "ningaloo"], 8: ["cocos", "galapagos"], 9: ["cocos", "galapagos", "redsea"], 10: ["raja", "cocos", "galapagos", "redsea"], 11: ["raja", "cocos", "galapagos", "redsea", "socorro"], 12: ["raja", "socorro"] };

export default function Home() {
  const [selected, setSelected] = useState(spots[0]);
  const [month, setMonth] = useState(10);
  const [query, setQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [liked, setLiked] = useState(false);
  const [touring, setTouring] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const match = useMemo(() => sampleWindows[month]?.includes(selected.id), [month, selected]);
  const saved = savedIds.includes(selected.id);

  function planTrip() {
    const requestedMonth = query.match(/(?:^|\D)(1[0-2]|[1-9])\s*月/);
    const nextMonth = requestedMonth ? Number(requestedMonth[1]) : month;
    const terms = query.replace(/(?:^|\D)(?:1[0-2]|[1-9])\s*月/, " ").replace(/今年|去哪里|哪里|想看|看|潜水|推荐|适合|？|\?/g, " ").trim();
    if (!terms) {
      setSearchMessage("请输入目的地或想看的海洋生物，例如“10月 锤头鲨”。");
      return;
    }
    const candidates = spots.filter((spot) => `${spot.name} ${spot.country} ${spot.tag} ${spot.wildlife.join(" ")}`.includes(terms));
    if (candidates.length === 0) {
      setSearchMessage("这 7 个示例潜点中没有找到匹配项。请试试目的地名称或“鲸鲨”“锤头鲨”。");
      return;
    }
    const preferred = candidates.find((spot) => sampleWindows[nextMonth]?.includes(spot.id)) ?? candidates[0];
    setMonth(nextMonth);
    setSelected(preferred);
    setSearchMessage(`已按示例资料选择${preferred.name}；请向当地持证潜导核实实际海况。`);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#"><span className="brandMark">◉</span> BLUEPRINT</a>
        <nav><a href="#explore">探索</a><a href="#season">海况日历</a><a href="#community">潜水社区</a><a href="#mask">智能面镜</a></nav>
        <div className="actions"><span className="demoBadge">交互原型 · 示例数据</span></div>
      </header>

      <section className="hero" id="explore">
        <div className="heroCopy">
          <p className="eyebrow"><span>DIVE DESTINATION EXPLORER</span><i /> 非实时资料</p>
          <h1>下一次下潜，<br /><em>遇见更大的世界。</em></h1>
          <p className="lead">探索 7 个示例潜点，按月份和海洋生物寻找灵感。这里不是实时海况或安全建议；出行前请核对官方信息与当地潜导意见。</p>
          <form className="promptBar" onSubmit={(event) => { event.preventDefault(); planTrip(); }}>
            <span className="spark">✦</span>
            <input aria-label="搜索示例潜点" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例如：10月 锤头鲨" />
            <button type="submit">查找示例 <b>→</b></button>
          </form>
          {searchMessage && <p className="searchFeedback" role="status">{searchMessage}</p>}
          <div className="quick"><span>快速查看</span><button onClick={() => setSelected(spots[1])}>锤头鲨</button><button onClick={() => setSelected(spots[4])}>马尔代夫</button><button onClick={() => setSelected(spots[0])}>微距生物</button></div>
        </div>
        <div className="globe" aria-label="全球热门潜点示意图">
          <div className="glow" />
          <div className="planet">
            <div className="land l1" /><div className="land l2" /><div className="land l3" /><div className="land l4" />
            <div className="orbit o1" /><div className="orbit o2" />
            {spots.map(s => <button key={s.id} aria-label={s.name} onClick={() => setSelected(s)} className={`globeDot ${selected.id === s.id ? "active" : ""}`} style={{ left: `${s.x}%`, top: `${s.y}%` }}><span>{s.icon}</span></button>)}
          </div>
          <div className="mapStat"><b>7</b><span>示例潜点</span></div>
        </div>
      </section>

      <section className="dashboard">
        <div className="dashHead">
          <div><p className="sectionKicker">DIVE WINDOW</p><h2>你的最佳下潜窗口</h2></div>
          <div className="monthControl"><button aria-label="上一个月份" onClick={() => setMonth(month === 1 ? 12 : month - 1)}>‹</button><strong>{month}月 · 示例窗口</strong><button aria-label="下一个月份" onClick={() => setMonth(month === 12 ? 1 : month + 1)}>›</button></div>
        </div>

        <div className="mainGrid">
          <aside className="spotList">
            {(showAll ? spots : spots.slice(0, 5)).map((s, i) => <button key={s.id} className={`spotRow ${selected.id === s.id ? "selected" : ""}`} onClick={() => setSelected(s)}>
              <span className="rank">0{i + 1}</span><span className="animal">{s.icon}</span><span className="spotText"><b>{s.name}</b><small>{s.country} · {s.tag}</small></span><span className="score">{sampleWindows[month]?.includes(s.id) ? "示例窗口" : "其他月份"}</span>
            </button>)}
            <button className="allSpots" onClick={() => setShowAll(!showAll)}>{showAll ? "收起潜点" : "查看全部 7 个示例潜点"} <span>↗</span></button>
          </aside>

          <article className="detail">
            <div className="detailHero">
              <div className="underwater">
                <div className="ray">◆</div><div className="fish f1">‹‹‹</div><div className="fish f2">‹‹</div><div className="bubbles">○<br />·<br />°</div>
              </div>
              <div className="detailOverlay">
                <div><p>{selected.country}</p><h3>{selected.name}</h3></div>
                <button onClick={() => setTouring(true)}><span>▶</span> 查看概念场景</button>
              </div>
              <button className="save" onClick={() => setSavedIds((current) => saved ? current.filter((id) => id !== selected.id) : [...current, selected.id])} aria-label={saved ? "取消收藏" : "收藏当前潜点"} aria-pressed={saved}>{saved ? "♥" : "♡"}</button>
            </div>
            <div className="conditions">
              <div><span>最佳季节</span><b>{selected.season}</b></div><div><span>水温</span><b>{selected.temp}</b></div><div><span>能见度</span><b>{selected.visibility}</b></div><div><span>洋流</span><b>{selected.current}</b></div>
            </div>
            <div className="sightings"><span>进入海域可能遇见</span>{selected.wildlife.map((w, i) => <b key={w} className={i === 0 ? "primary" : ""}>{w}</b>)}</div>
            <div className={`aiNote ${match ? "" : "muted"}`}><span>✦</span><p><b>示例季节提示</b>{match ? `${month}月列在这份演示资料的参考窗口内。实际海况、能见度和野生动物目击无法保证。` : `${month}月未列在参考窗口内；可查看 ${selected.season}，并向当地潜导核实。`}</p><strong>{match ? "参考" : "核实"}<small>非预测</small></strong></div>
          </article>
        </div>
      </section>

      <section className="season" id="season">
        <div className="sectionIntro"><div><p className="sectionKicker">OCEAN CALENDAR</p><h2>按月份探索潜点。</h2></div><p>以下是静态示例窗口，不连接卫星或实时海洋数据，也不预测目击概率。</p></div>
        <div className="calendar">
          <div className="calLabels"><span>目的地 / 月份</span>{monthShort.map(m => <b key={m}>{m}</b>)}</div>
          {spots.slice(0, 4).map((s) => <div className="calRow" key={s.id}><span>{s.icon} {s.name}</span>{monthShort.map((_, mi) => <i key={mi} className={sampleWindows[mi + 1]?.includes(s.id) ? "hot" : ""} />)}</div>)}
          <div className="legend"><span><i className="hot" />示例参考窗口</span><span><i />其他月份</span></div>
        </div>
      </section>

      <section className="experts">
        <div className="sectionIntro"><div><p className="sectionKicker">LOCAL NETWORK CONCEPT</p><h2>当地服务信息 · 界面概念。</h2></div><p>以下卡片仅演示未来可接入的服务商资料，不代表真实合作或认证。</p></div>
        <div className="expertGrid">
          <article><div className="expertIcon">⚓</div><div><small>示例服务商</small><h3>潜店资料卡</h3><p>未来可展示资质、语言、服务范围与联系方式；当前不提供预订。</p><span>演示内容 · 非真实商家</span></div></article>
          <article><div className="expertIcon coral">◉</div><div><small>示例创作者</small><h3>水下摄影师资料卡</h3><p>未来可展示作品、拍摄专长和服务地区。</p><span>演示内容 · 非真实评价</span></div></article>
        </div>
      </section>

      <section className="community" id="community">
        <div className="communityCard">
          <div className="userline"><div className="userpic">示</div><div><b>示例潜水日志</b><span>科科斯岛 · 虚构内容</span></div></div>
          <div className="communityVisual"><div className="shark">≺≺≺</div><div className="school">· · ·　· ·<br /> · ·　· · ·</div><span>本周精选</span></div>
          <p>这是一张用于展示社区布局的虚构日志卡片。真实目击记录需要时间、地点、潜店与影像来源核验后才能用于行程判断。</p>
          <div className="social"><button onClick={() => setLiked(!liked)} className={liked ? "liked" : ""} aria-pressed={liked}>{liked ? "♥ 已喜欢" : "♡ 喜欢示例"}</button><span>#示例内容 #科科斯岛</span></div>
        </div>
        <div className="join">
          <p className="sectionKicker">DIVER STORIES CONCEPT</p><h2>未来的真实日志，<br />从可核验来源开始。</h2><p>社区上传与物种识别尚未实现。这个区域仅展示未来可扩展的产品方向，不收集照片或潜水日志。</p><small>交互原型 · 无社区账号或实时数据</small>
        </div>
      </section>

      <section className="mask" id="mask">
        <div className="maskVisual"><div className="face"><div className="scanner" /><div className="goggle"><i /><i /><b /></div></div><span className="scanTag s1">尺寸示意</span><span className="scanTag s2">未进行测量</span><span className="scanTag s3">需现场试戴</span></div>
        <div className="maskCopy"><p className="sectionKicker">MASK FIT CONCEPT</p><h2>面镜适配，先从安全与隐私开始。</h2><p>这是未来功能的设计概念；当前网站不调用摄像头、不分析面部图像，也不推荐具体面镜。</p><div className="privacy"><span>◉</span><div><b>概念展示，不是安全测量</b><small>选购仍需真人试戴和专业指导；本网站不能替代安全检查。</small></div></div><button onClick={() => setScanOpen(true)}>查看概念说明 <b>→</b></button></div>
      </section>

      <footer><a className="brand" href="#"><span className="brandMark">◉</span> BLUEPRINT</a><p>为下一次蓝色相遇而生。</p><span>© 2026 Blueprint Ocean Intelligence</span></footer>

      {touring && <div className="modal" onClick={() => setTouring(false)}><div className="tour" role="dialog" aria-modal="true" aria-label="概念场景" onClick={e => e.stopPropagation()}><button className="close" aria-label="关闭" onClick={() => setTouring(false)}>×</button><div className="tourSea"><div className="tRay">◆</div><div className="reef r1" /><div className="reef r2" /><div className="tourHud"><span>概念插画 · 非实景影像</span><b>{selected.name} / SCENE STUDY</b><small>没有 3D 导览功能</small></div></div><div className="tourBottom"><div><b>场景示意</b><span>不能用于判断路线、深度或安全条件</span></div><button onClick={() => setTouring(false)}>关闭</button></div></div></div>}
      {scanOpen && <div className="modal" onClick={() => setScanOpen(false)}><div className="scanModal" role="dialog" aria-modal="true" aria-label="面镜适配概念说明" onClick={e => e.stopPropagation()}><button className="close" aria-label="关闭" onClick={() => setScanOpen(false)}>×</button><p className="sectionKicker">PRIVACY FIRST</p><h2>这是一项尚未实现的概念</h2><ul><li>当前页面不会请求摄像头权限</li><li>不会上传、保存或分析面部图像</li><li>页面上的尺寸与贴合图形均为视觉示意</li><li>面镜选择仍需真人试戴和专业安全检查</li></ul><button className="primaryButton" onClick={() => setScanOpen(false)}>关闭说明</button></div></div>}
    </main>
  );
}
