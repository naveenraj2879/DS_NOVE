import { initialTeam } from './mockData';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const fetchTeamFromApi = async () => {
  try {
    const response = await fetch(`${API_BASE}/team`);
    if (!response.ok) throw new Error('Failed to fetch team');
    const data = await response.json();
    return Array.isArray(data) && data.length > 0 ? data : initialTeam;
  } catch (error) {
    console.error('Team API fetch failed:', error);
    return initialTeam;
  }
};

export const saveTeamToApi = async (team) => {
  try {
    const response = await fetch(`${API_BASE}/team`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team),
    });
    if (!response.ok) throw new Error('Failed to save team');
    return await response.json();
  } catch (error) {
    console.error('Team API save failed:', error);
    return null;
  }
};
