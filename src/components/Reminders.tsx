import { useState } from 'react';
import { Bell, Plus, Clock, Calendar, Trash2, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './shared/Header';
import VoiceButton from './shared/VoiceButton';

interface RemindersProps {
  onBack: () => void;
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  type: 'irrigation' | 'fertilizer' | 'pestControl' | 'harvest' | 'market' | 'general';
  completed: boolean;
  recurring?: 'daily' | 'weekly' | 'monthly';
}

const reminderTypes = [
  { key: 'irrigation', labelKey: 'irrigation', color: 'bg-blue-500' },
  { key: 'fertilizer', labelKey: 'fertilizer', color: 'bg-green-500' },
  { key: 'pestControl', labelKey: 'pestControl', color: 'bg-red-500' },
  { key: 'harvest', labelKey: 'harvest', color: 'bg-yellow-500' },
  { key: 'market', labelKey: 'market', color: 'bg-purple-500' },
  { key: 'general', labelKey: 'general', color: 'bg-gray-500' },
];

export default function Reminders({ onBack }: RemindersProps) {
  const { t } = useLanguage();
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'കുരുമുളക് നനയ്ക്കൽ',
      description: 'കുരുമുളക് ചെടികൾക്ക് വെള്ളം കൊടുക്കുക - പുലർച്ചെ 6 മണിക്ക്',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      type: 'irrigation',
      completed: false,
      recurring: 'daily',
    },
    {
      id: '2',
      title: 'വളപ്രയോഗം - നെല്ല്',
      description: 'നെൽവയലിൽ യൂറിയ വളം ഇടുക - 25kg ആവശ്യം',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      type: 'fertilizer',
      completed: false,
    },
    {
      id: '3',
      title: 'കുരുമുളക് വിലപരിശോധന',
      description: 'കൊച്ചി സ്പൈസ് മാർക്കറ്റിൽ കുരുമുളക് വില അന്വേഷിക്കുക',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      type: 'market',
      completed: false,
      recurring: 'weekly',
    },
  ]);

  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    type: 'general' as Reminder['type'],
    dueDate: '',
    recurring: '' as '' | 'daily' | 'weekly' | 'monthly',
  });

  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.dueDate) return;
    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title,
      description: newReminder.description,
      type: newReminder.type,
      dueDate: new Date(newReminder.dueDate),
      completed: false,
      recurring: newReminder.recurring || undefined,
    };
    setReminders(prev => [...prev, reminder]);
    setNewReminder({ title: '', description: '', type: 'general', dueDate: '', recurring: '' });
    setShowAddReminder(false);
  };

  const toggleCompleted = (id: string) => {
    setReminders(prev => prev.map(r => (r.id === id ? { ...r, completed: !r.completed } : r)));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const getTypeInfo = (type: string) => {
    return reminderTypes.find(t => t.key === type) || reminderTypes[reminderTypes.length - 1];
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return t('today');
    if (date.toDateString() === tomorrow.toDateString()) return t('tomorrow');
    return date.toLocaleDateString();
  };

  const activeReminders = reminders.filter(r => !r.completed);
  const completedReminders = reminders.filter(r => r.completed);

  const ReminderCard = ({
    reminder,
    isCompleted = false,
  }: {
    reminder: Reminder;
    isCompleted?: boolean;
  }) => {
    const typeInfo = getTypeInfo(reminder.type);
    const isOverdue = reminder.dueDate < new Date();
    const isDueToday = reminder.dueDate.toDateString() === new Date().toDateString();

    return (
      <div
        className={`bg-white rounded-xl shadow-sm p-4 ${
          isCompleted
            ? 'bg-gray-50 opacity-75'
            : `border-l-4 ${
                isOverdue ? 'border-red-500' : isDueToday ? 'border-yellow-500' : 'border-green-500'
              }`
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`${typeInfo.color} w-3 h-3 rounded-full`}></div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {t(typeInfo.labelKey)}
              </span>
              {reminder.recurring && !isCompleted && (
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                  {t(reminder.recurring)}
                </span>
              )}
              {isCompleted && (
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs flex items-center">
                  <Check className="w-3 h-3 mr-1" /> {t('completed')}
                </span>
              )}
            </div>
            <h3
              className={`font-semibold ${
                isCompleted ? 'text-gray-600 line-through' : 'text-gray-800'
              } mb-1`}
            >
              {reminder.title}
            </h3>
            <p className={`text-sm ${isCompleted ? 'text-gray-500' : 'text-gray-600'} mb-2`}>
              {reminder.description}
            </p>
            {!isCompleted && (
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" /> {formatDate(reminder.dueDate)}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />{' '}
                  {reminder.dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {isOverdue && <span className="text-red-600 font-medium">{t('overdue')}</span>}
              </div>
            )}
          </div>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => toggleCompleted(reminder.id)}
              className={`p-2 ${
                isCompleted ? 'text-gray-500 hover:bg-gray-200' : 'text-green-600 hover:bg-green-100'
              } rounded-full transition-all`}
              title={isCompleted ? t('markAsPending') : t('markAsCompleted')}
            >
              {isCompleted ? <Bell className="w-4 h-4" /> : <Check className="w-4 h-4" />}
            </button>
            {!isCompleted && (
              <button
                onClick={() => deleteReminder(reminder.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-all"
                title={t('deleteReminder')}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      <Header title={t('reminders')} onBack={onBack} />

      <div className="p-4">
        {/* Add Reminder Button */}
        <button
          onClick={() => setShowAddReminder(true)}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 mb-6 hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>{t('addReminder')}</span>
        </button>

        {/* Active Reminders */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" /> {t('activeReminders')}
            <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
              {activeReminders.length}
            </span>
          </h2>
          <div className="space-y-3">
            {activeReminders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {t('activeReminders')} {t('noData')}
                </p>
              </div>
            ) : (
              activeReminders.map(r => <ReminderCard key={r.id} reminder={r} />)
            )}
          </div>
        </div>

        {/* Completed Reminders */}
        {completedReminders.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Check className="w-5 h-5 mr-2" /> {t('completed')}
              <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                {completedReminders.length}
              </span>
            </h2>
            <div className="space-y-3">
              {completedReminders.map(r => (
                <ReminderCard key={r.id} reminder={r} isCompleted />
              ))}
            </div>
          </div>
        )}

        {/* Voice Commands */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6">
          <h3 className="font-bold text-orange-800 mb-2">{t('voiceCommands')}</h3>
          <div className="space-y-1 text-sm text-orange-700">
            <p>
              <strong>{t('say')}:</strong> "{t('voiceExample')}"
            </p>
            <p>
              <strong>IVR:</strong> Call 1800-KRISHI to hear reminders
            </p>
          </div>
        </div>
      </div>

      {/* Add Reminder Modal */}
      {showAddReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{t('addReminder')}</h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('title')}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={newReminder.title}
                    onChange={e => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={t('title')}
                    className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                  />
                  <VoiceButton
                    onVoiceInput={text => setNewReminder(prev => ({ ...prev, title: text }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  />
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('type')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {reminderTypes.map(type => (
                    <button
                      key={type.key}
                      onClick={() =>
                        setNewReminder(prev => ({ ...prev, type: type.key as Reminder['type'] }))
                      }
                      className={`p-3 rounded-lg border-2 text-sm transition-all ${
                        newReminder.type === type.key
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-3 h-3 ${type.color} rounded-full mx-auto mb-1`}></div>
                      {t(type.labelKey)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('description')}
                </label>
                <div className="relative">
                  <textarea
                    value={newReminder.description}
                    onChange={e =>
                      setNewReminder(prev => ({ ...prev, description: e.target.value }))
                    }
                    placeholder={t('description')}
                    rows={3}
                    className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                  />
                  <VoiceButton
                    onVoiceInput={text =>
                      setNewReminder(prev => ({ ...prev, description: text }))
                    }
                    className="absolute right-3 top-3"
                  />
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('dueDateTime')}
                </label>
                <input
                  type="datetime-local"
                  value={newReminder.dueDate}
                  onChange={e => setNewReminder(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Recurring */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('repeat')}</label>
                <select
                  value={newReminder.recurring}
                  onChange={e =>
                    setNewReminder(prev => ({ ...prev, recurring: e.target.value as any }))
                  }
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">{t('noRepeat')}</option>
                  <option value="daily">{t('daily')}</option>
                  <option value="weekly">{t('weekly')}</option>
                  <option value="monthly">{t('monthly')}</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddReminder(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleAddReminder}
                disabled={!newReminder.title || !newReminder.dueDate}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-green-700 transition-all"
              >
                {t('save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
