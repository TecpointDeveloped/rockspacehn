export function VideoEmbed({
  youtubeId,
  title,
}: {
  youtubeId?: string;
  title: string;
}) {
  if (!youtubeId) {
    return (
      <div className="video-placeholder">
        <div className="video-placeholder-icon" aria-hidden="true">▶</div>
        <div>
          <span className="eyebrow light">TUTORIAL PRÓXIMAMENTE</span>
          <h3>{title}</h3>
          <p>Este espacio queda reservado para el tutorial propio de ROCKSPACEHN, sin mandar al usuario a otra página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="video-frame">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
