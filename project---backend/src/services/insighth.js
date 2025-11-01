const db = require('../db/database');

function getInsights() {
  // Aggregate queries
  const totalOpen = db.prepare("SELECT COUNT(*) as count FROM tasks WHERE status = 'Open'").get().count;
  const priorityCounts = db.prepare("SELECT priority, COUNT(*) as count FROM tasks WHERE status = 'Open' GROUP BY priority").all();
  const dueSoonCount = db.prepare("SELECT COUNT(*) as count FROM tasks WHERE status != 'Done' AND due_date <= date('now', '+3 days')").get().count;

  // Rule-based summary logic
  let dominantPriority = 'Medium';
  const highCount = priorityCounts.find(p => p.priority === 'High')?.count || 0;
  const totalPrioritized = priorityCounts.reduce((sum, p) => sum + p.count, 0);
  if (highCount > totalPrioritized * 0.5) dominantPriority = 'High';
  else if (priorityCounts.find(p => p.priority === 'Low')?.count > totalPrioritized * 0.5) dominantPriority = 'Low';

  let summary = `You have **${totalOpen}** open tasks.`;
  if (dueSoonCount > 0) {
    summary += ` **${dueSoonCount}** are due in the next 3 days.`;
  }
  if (totalOpen > 5) {
    summary += ` Most of your backlog is categorized as **${dominantPriority}** priority.`;
  }

  return {
    totalOpen,
    priorityDistribution: priorityCounts,
    dueSoonCount,
    summary
  };
}

module.exports = { getInsights };