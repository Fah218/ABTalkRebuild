import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'src/data/completed-days.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const updatedData = data.map(day => {
  if (day.day === 10) {
    return {
      ...day,
      status: 'missed',
      completionDate: '',
      githubUrl: '',
      linkedinUrl: ''
    };
  } else if (day.day === 11) {
    return {
      ...day,
      status: 'catchup',
      completionDate: '',
      githubUrl: '',
      linkedinUrl: '',
      checklist: [
        { id: 'refactor', label: 'Identify and eliminate code duplication', checked: false },
        { id: 'optimize', label: 'Optimize assets for performance', checked: false },
        { id: 'test', label: 'Perform cross-browser and mobile testing', checked: false },
        { id: 'github', label: 'GitHub repository updated', checked: false },
        { id: 'linkedin', label: 'LinkedIn post published', checked: false }
      ]
    };
  } else {
    return {
      ...day,
      status: 'completed'
    };
  }
});

fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2));
console.log('updated completed-days.json');
