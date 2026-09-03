export type LearningItem = {
  label: string;
  title: string;
  text: string;
};

export function LearningPath({ items }: { items: LearningItem[] }) {
  return (
    <div className="learning-path" aria-label="Ruta de aprendizaje">
      {items.map((item, index) => (
        <article key={item.label}>
          <div className="learning-path-index">0{index + 1}</div>
          <span>{item.label}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
