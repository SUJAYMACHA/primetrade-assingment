import { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  FiPlus, FiSearch, FiFilter, FiEdit2, FiTrash2, 
  FiCheckCircle, FiClock, FiAlertCircle 
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import Card, { CardBody, CardHeader } from '../components/Card';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { taskAPI } from '../utils/api';
import { getUser } from '../utils/auth';
import TaskModal from '../components/TaskModal';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, 'in-progress': 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const user = getUser();

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [searchTerm, statusFilter, priorityFilter]);

  const fetchTasks = async () => {
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;

      const response = await taskAPI.getTasks(params);
      if (response.data.success) {
        setTasks(response.data.data.tasks);
      }
    } catch (error) {
      console.error('Fetch tasks error:', error);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await taskAPI.getStats();
      if (response.data.success) {
        setStats(response.data.data.stats);
      }
    } catch (error) {
      console.error('Fetch stats error:', error);
    }
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const response = await taskAPI.deleteTask(taskId);
      if (response.data.success) {
        toast.success('Task deleted successfully');
        fetchTasks();
        fetchStats();
      }
    } catch (error) {
      console.error('Delete task error:', error);
      toast.error('Failed to delete task');
    }
  };

  const handleModalClose = (shouldRefresh) => {
    setShowModal(false);
    setSelectedTask(null);
    if (shouldRefresh) {
      fetchTasks();
      fetchStats();
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="text-green-500" />;
      case 'in-progress':
        return <FiClock className="text-blue-500" />;
      default:
        return <FiAlertCircle className="text-yellow-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-700 border border-amber-300',
      'in-progress': 'bg-blue-100 text-blue-700 border border-blue-300',
      completed: 'bg-emerald-100 text-emerald-700 border border-emerald-300',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      low: 'bg-slate-100 text-slate-700 border border-slate-300',
      medium: 'bg-orange-100 text-orange-700 border border-orange-300',
      high: 'bg-rose-100 text-rose-700 border border-rose-300',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[priority]}`}>
        {priority}
      </span>
    );
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Head>
          <title>Dashboard - PrimeTrade</title>
        </Head>

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tasks efficiently and stay organized
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-primary-500">
            <CardBody>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{stats.total}</p>
            </CardBody>
          </Card>
          <Card className="border-l-4 border-yellow-500">
            <CardBody>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{stats.pending}</p>
            </CardBody>
          </Card>
          <Card className="border-l-4 border-blue-500">
            <CardBody>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats['in-progress']}</p>
            </CardBody>
          </Card>
          <Card className="border-l-4 border-green-500">
            <CardBody>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.completed}</p>
            </CardBody>
          </Card>
        </div>

        {/* Actions and Filters */}
        <Card className="mb-6">
          <CardBody>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Filters */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
              >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              {/* Create Button */}
              <Button onClick={handleCreateTask} icon={FiPlus}>
                New Task
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Your Tasks</h2>
          </CardHeader>
          <CardBody>
            {loading ? (
              <Loading />
            ) : tasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 mb-4">No tasks found</p>
                <Button onClick={handleCreateTask} icon={FiPlus}>
                  Create Your First Task
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          {getStatusIcon(task.status)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                              {task.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {getStatusBadge(task.status)}
                            {getPriorityBadge(task.priority)}
                            {task.dueDate && (
                              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          {task.tags && task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {task.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Task Modal */}
        {showModal && (
          <TaskModal
            task={selectedTask}
            onClose={handleModalClose}
          />
        )}
      </Layout>
    </ProtectedRoute>
  );
}
