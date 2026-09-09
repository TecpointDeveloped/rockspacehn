"use client";

import { useState } from "react";

export function VideoEmbed({ youtubeId, title, spanishSummary }: { youtubeId?: string; title: string; spanishSummary?: string }) {
  const [playing, setPlaying] = useState(false);

  if (!youtubeId) {
    return (
      <div className="video-placeholder">
        <div className="video-placeholder-icon" aria-hidden="true">▶</div>
        <div>
          <span className="eyebrow light">TUTORIAL PRÓXIMAMENTE</span>
          <h3>{title}</h3>
          <p>Este espacio queda reservado para el tutorial propio de ROCKSPACEHN.</p>
        </div>
      </div>
    );
  }

  return <div className="video-block">
    <div className="video-frame">
      {playing ? <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1&cc_load_policy=1&cc_lang_pref=es&hl=es`}
        title={`${title}. Subtítulos en español activados`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
        allowFullScreen
      /> : <button className="video-poster" onClick={() => setPlaying(true)} aria-label={`Reproducir ${title} con subtítulos en español`}>
        <img src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`} alt="" width="480" height="360" loading="lazy" decoding="async" fetchPriority="low" />
        <span className="video-play" aria-hidden="true">▶</span>
        <strong>Reproducir con subtítulos en español</strong>
      </button>}
    </div>
    {spanishSummary && <details className="video-transcript"><summary>Leer guía en español <span>+</span></summary><p>{spanishSummary}</p></details>}
  </div>;
}
