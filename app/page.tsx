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
  score: number;
};

const spots: Spot[] = [
  { id: "raja", name: "四王群岛", country: "印度尼西亚", x: 78, y: 63, tag: "生物密度之王", icon: "🐋", season: "10月 — 次年4月", temp: "28–30°C", current: "中等 · 上升流活跃", visibility: "15–30m", wildlife: ["魔鬼鱼", "鲸鲨", "豆丁海马", "杰克鱼风暴"], score: 4.9 },
  { id: "cocos", name: "科科斯岛", country: "哥斯达黎加", x: 24, y: 58, tag: "锤头鲨风暴", icon: "🦈", season: "6月 — 11月", temp: "24–28°C", current: "强 · 东赤道逆流", visibility: "12–25m", wildlife: ["锤头鲨群", "鹰鳐", "海豚", "鲸鲨"], score: 4.8 },
  { id: "socorro", name: "索科罗群岛", country: "墨西哥", x: 18, y: 43, tag: "巨型魔鬼鱼", icon: "🛸", season: "11月 — 次年5月", temp: "21–27°C", current: "中强 · 北赤道流", visibility: "15–35m", wildlife: ["巨型魔鬼鱼", "座头鲸", "海豚", "锤头鲨"], score: 4.9 },
  { id: "galapagos", name: "加拉帕戈斯", country: "厄瓜多尔", x: 28, y: 62, tag: "大货天花板", icon: "🐢", season: "6月 — 11月", temp: "18–25°C", current: "强 · 洪堡寒流", visibility: "10–25m", wildlife: ["鲸鲨", "海鬣蜥", "锤头鲨", "翻车鱼"], score: 4.9 },
  { id: "maldives", name: "马尔代夫", country: "马尔代夫", x: 63, y: 57, tag: "海沟巡游", icon: "🐟", season: "1月 — 4月", temp: "27–30°C", current: "中强 · 季风洋流", visibility: "20–40m", wildlife: ["鲸鲨", "魔鬼鱼", "灰礁鲨", "海龟"], score: 4.7 },
  { id: "redsea", name: "红海兄弟岛", country: "埃及", x: 56, y: 43, tag: "远洋白鳍鲨", icon: "🦈", season: "9月 — 11月", temp: "24–29°C", current: "中强 · 北向表层流", visibility: "25–40m", wildlife: ["长尾鲨", "远洋白鳍鲨", "双髻鲨", "梭鱼群"], score: 4.8 },
  { id: "ningaloo", name: "宁格鲁礁", country: "澳大利亚", x: 81, y: 73, tag: "鲸鲨之路", icon: "🐋", season: "3月 — 7月", temp: "24–28°C", current: "温和 · 利文暖流", visibility: "15–30m", wildlife: ["鲸鲨", "座头鲸", "魔鬼鱼", "儒艮"], score: 4.8 },
];

const monthShort = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

export default function Home() {
  const [selected, setSelected] = useState(spots[0]);
  const [month, setMonth] = useState(10);
  const [liked, setLiked] = useState(false);
  const [touring, setTouring] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const match = useMemo(() => {
    const best: Record<number, string[]> = { 1: ["raja", "maldives"], 2: ["raja", "maldives"], 3: ["raja", "maldives", "ningaloo"], 4: ["raja", "maldives", "ningaloo"], 5: ["socorro", "ningaloo"], 6: ["cocos", "galapagos", "ningaloo"], 7: ["cocos", "galapagos", "ningaloo"], 8: ["cocos", "galapagos"], 9: ["cocos", "galapagos", "redsea"], 10: ["raja", "redsea"], 11: ["raja", "socorro", "redsea"], 12: ["raja", "socorro"] };
    return best[month]?.includes(selected.id);
  }, [month, selected]);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#"><span className="brandMark">◉</span> BLUEPRINT</a>
        <nav><a href="#explore">探索</a><a href="#season">海况日历</a><a href="#community">潜水社区</a><a href="#mask">智能面镜</a></nav>
        <div className="actions"><button className="iconBtn" aria-label="搜索">⌕</button><button className="avatar">LJ</button></div>
      </header>

      <section className="hero" id="explore">
        <div className="heroCopy">
          <p className="eyebrow"><span>LIVE OCEAN INTELLIGENCE</span><i /> 数据更新于 12 分钟前</p>
          <h1>下一次下潜，<br /><em>遇见更大的世界。</em></h1>
          <p className="lead">把全球洋流、季节与真实目击整合进一张会思考的潜水地图。告诉 AI 你想看什么，它会告诉你何时、去哪里。</p>
          <div className="promptBar">
            <span className="spark">✦</span>
            <input aria-label="AI 搜索" placeholder="例如：今年 10 月去哪里看锤头鲨？" />
            <button onClick={() => { setSelected(spots[3]); setMonth(10); }}>规划旅程 <b>→</b></button>
          </div>
          <div className="quick"><span>热门搜索</span><button onClick={() => setSelected(spots[1])}>锤头鲨风暴</button><button onClick={() => setSelected(spots[4])}>水清人少</button><button onClick={() => setSelected(spots[0])}>微距天堂</button></div>
        </div>
        <div className="globe" aria-label="全球热门潜点示意图">
          <div className="glow" />
          <div className="planet">
            <div className="land l1" /><div className="land l2" /><div className="land l3" /><div className="land l4" />
            <div className="orbit o1" /><div className="orbit o2" />
            {spots.map(s => <button key={s.id} aria-label={s.name} onClick={() => setSelected(s)} className={`globeDot ${selected.id === s.id ? "active" : ""}`} style={{ left: `${s.x}%`, top: `${s.y}%` }}><span>{s.icon}</span></button>)}
          </div>
          <div className="mapStat"><b>2,847</b><span>全球认证潜点</span></div>
        </div>
      </section>

      <section className="dashboard">
        <div className="dashHead">
          <div><p className="sectionKicker">DIVE WINDOW</p><h2>你的最佳下潜窗口</h2></div>
          <div className="monthControl"><button onClick={() => setMonth(month === 1 ? 12 : month - 1)}>‹</button><strong>2026 · {month}月</strong><button onClick={() => setMonth(month === 12 ? 1 : month + 1)}>›</button></div>
        </div>

        <div className="mainGrid">
          <aside className="spotList">
            {spots.slice(0, 5).map((s, i) => <button key={s.id} className={`spotRow ${selected.id === s.id ? "selected" : ""}`} onClick={() => setSelected(s)}>
              <span className="rank">0{i + 1}</span><span className="animal">{s.icon}</span><span className="spotText"><b>{s.name}</b><small>{s.country} · {s.tag}</small></span><span className="score">★ {s.score}</span>
            </button>)}
            <button className="allSpots">查看全部 2,847 个潜点 <span>↗</span></button>
          </aside>

          <article className="detail">
            <div className="detailHero">
              <div className="underwater">
                <div className="ray">◆</div><div className="fish f1">‹‹‹</div><div className="fish f2">‹‹</div><div className="bubbles">○<br />·<br />°</div>
              </div>
              <div className="detailOverlay">
                <div><p>{selected.country}</p><h3>{selected.name}</h3></div>
                <button onClick={() => setTouring(true)}><span>▶</span> AI 3D 导览</button>
              </div>
              <button className="save" onClick={() => setSaved(!saved)} aria-label="收藏">{saved ? "♥" : "♡"}</button>
            </div>
            <div className="conditions">
              <div><span>最佳季节</span><b>{selected.season}</b></div><div><span>水温</span><b>{selected.temp}</b></div><div><span>能见度</span><b>{selected.visibility}</b></div><div><span>洋流</span><b>{selected.current}</b></div>
            </div>
            <div className="sightings"><span>进入海域可能遇见</span>{selected.wildlife.map((w, i) => <b key={w} className={i === 0 ? "primary" : ""}>{w}</b>)}</div>
            <div className={`aiNote ${match ? "" : "muted"}`}><span>✦</span><p><b>AI 海况判断</b>{match ? `${month}月正值高概率窗口，历史目击与洋流模型均给出“值得出发”。` : `${month}月并非核心窗口，建议改期至 ${selected.season}，或切换目的地。`}</p><strong>{match ? "92%" : "61%"}<small>匹配度</small></strong></div>
          </article>
        </div>
      </section>

      <section className="season" id="season">
        <div className="sectionIntro"><div><p className="sectionKicker">OCEAN CALENDAR</p><h2>追随洋流，而不是运气。</h2></div><p>AI 结合卫星海温、月相、历史目击与当地潜导报告，预测大货出现概率。</p></div>
        <div className="calendar">
          <div className="calLabels"><span>目的地 / 月份</span>{monthShort.map(m => <b key={m}>{m}</b>)}</div>
          {spots.slice(0, 4).map((s, si) => <div className="calRow" key={s.id}><span>{s.icon} {s.name}</span>{monthShort.map((_, mi) => <i key={mi} className={(mi + si * 2) % 6 < 3 ? "hot" : (mi + si) % 4 === 0 ? "warm" : ""} />)}</div>)}
          <div className="legend"><span><i className="hot" />最佳窗口</span><span><i className="warm" />可见概率高</span><span><i />淡季 / 不稳定</span></div>
        </div>
      </section>

      <section className="experts">
        <div className="sectionIntro"><div><p className="sectionKicker">LOCAL NETWORK</p><h2>找到真正懂这片海的人。</h2></div><button>查看全部服务商 →</button></div>
        <div className="expertGrid">
          <article><div className="expertIcon">⚓</div><div><small>五星潜店 · PADI 5 STAR</small><h3>Raja Ampat Dive Lodge</h3><p>中文潜导 · 高氧 · 水下摄影器材租赁</p><span>★★★★★ <b>4.9 · 328 条评价</b></span></div><button>联系 ↗</button></article>
          <article><div className="expertIcon coral">◉</div><div><small>水下摄影师 · AMBASSADOR</small><h3>Maya Chen</h3><p>大货广角 · 旅拍 · 6K 水下视频</p><span>★★★★★ <b>4.8 · 126 次合作</b></span></div><button>查看作品 ↗</button></article>
        </div>
      </section>

      <section className="community" id="community">
        <div className="communityCard">
          <div className="userline"><div className="userpic">MC</div><div><b>Mia Chen <em>✓</em></b><span>科科斯岛 · 3 天前</span></div><button>•••</button></div>
          <div className="communityVisual"><div className="shark">≺≺≺</div><div className="school">· · ·　· ·<br /> · ·　· · ·</div><span>本周精选</span></div>
          <p>第 17 次下潜，终于被锤头鲨风暴包围。六月的上升流很强，但一切都值得。潜导说今年水温比往年低 1°C，大货来得更早。</p>
          <div className="social"><button onClick={() => setLiked(!liked)} className={liked ? "liked" : ""}>{liked ? "♥" : "♡"} {liked ? "1,285" : "1,284"}</button><button>◯ 86</button><button>↗ 分享</button><span>#锤头鲨 #科科斯岛</span></div>
        </div>
        <div className="join">
          <p className="sectionKicker">DIVER STORIES</p><h2>每一次下潜，<br />都让地图更准确。</h2><p>上传照片与潜水日志，AI 自动识别物种、记录海况，也帮助下一位潜水员做出更好的选择。</p><button>＋ 分享我的潜水体验</button><small>已有 128,640 位潜水员贡献真实数据</small>
        </div>
      </section>

      <section className="mask" id="mask">
        <div className="maskVisual"><div className="face"><div className="scanner" /><div className="goggle"><i /><i /><b /></div></div><span className="scanTag s1">鼻梁宽度 32mm</span><span className="scanTag s2">脸型贴合 98%</span><span className="scanTag s3">裙边尺寸 M</span></div>
        <div className="maskCopy"><p className="sectionKicker">AI MASK FIT</p><h2>一张自拍，找到真正不漏水的面镜。</h2><p>用手机深度摄像头建立面部尺寸模型，匹配鼻梁、面宽和裙边曲线。面部数据默认只在设备本地处理，不用于身份识别。</p><div className="privacy"><span>◉</span><div><b>这是“尺寸测量”，不是人脸识别</b><small>需真人试戴与负压测试确认；AI 推荐不能替代安全检查。</small></div></div><button onClick={() => setScanOpen(true)}>开始安全扫描 <b>→</b></button></div>
      </section>

      <footer><a className="brand" href="#"><span className="brandMark">◉</span> BLUEPRINT</a><p>为下一次蓝色相遇而生。</p><span>© 2026 Blueprint Ocean Intelligence</span></footer>

      {touring && <div className="modal" onClick={() => setTouring(false)}><div className="tour" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setTouring(false)}>×</button><div className="tourSea"><div className="tRay">◆</div><div className="reef r1" /><div className="reef r2" /><div className="tourHud"><span>AI 生成场景 · 非实时影像</span><b>{selected.name} / CHANNEL RIDGE</b><small>拖动视角 · 360°</small></div></div><div className="tourBottom"><div><b>01 / 04</b><span>进入峡道，顺流保持中性浮力</span></div><button onClick={() => setTouring(false)}>结束导览</button></div></div></div>}
      {scanOpen && <div className="modal" onClick={() => setScanOpen(false)}><div className="scanModal" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setScanOpen(false)}>×</button><p className="sectionKicker">PRIVACY FIRST</p><h2>开始前，请确认</h2><ul><li>在光线均匀处摘下眼镜，正对镜头</li><li>模型只计算面镜适配尺寸，不识别你的身份</li><li>原始面部图像默认不上传，随时可以删除测量结果</li><li>购买后仍需做吸附与呼吸管安全测试</li></ul><button className="primaryButton" onClick={() => setScanOpen(false)}>我已了解，继续扫描 →</button></div></div>}
    </main>
  );
}
