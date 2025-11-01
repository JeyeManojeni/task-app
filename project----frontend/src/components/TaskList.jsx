function TaskList({ tasks, onUpdate }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.priority}</td>
            <td>{task.due_date}</td>
            <td>{task.status}</td>
            <td>
              <select onChange={(e) => onUpdate(task.id, { status: e.target.value })}>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <select onChange={(e) => onUpdate(task.id, { priority: e.target.value })}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;