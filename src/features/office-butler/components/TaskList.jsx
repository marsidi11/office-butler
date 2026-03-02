export default function TaskList({ tasks, onToggle }) {
  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-icon">✓</span>
        <h3 className="card-title">Next Steps</h3>
        <span className="task-count">
          {doneCount}/{tasks.length}
        </span>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item" onClick={() => onToggle(task.id)}>
            <div className={task.done ? 'checkbox checkbox-done' : 'checkbox'}>
              {task.done ? <span className="check-mark">✓</span> : null}
            </div>
            <span className={task.done ? 'task-text task-text-done' : 'task-text'}>{task.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
