export function checkConflict(req_start_time, db_start_time, req_end_time, db_end_time,
    req_sTime, db_sTime, req_eTime, db_eTime) {

        if ((req_sTime === db_eTime || req_eTime === db_sTime)) {
            return false;
        }

        if ((Math.min(req_start_time, req_end_time) <= Math.max(db_start_time, db_end_time) &&
            Math.max(req_start_time, req_end_time) >= Math.min(db_start_time, db_end_time))) {
            return true;
        }

    return false;
}

export const departmentsList = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Mechanical Engineering' },
    { id: 3, name: 'Electrical Engineering' },
    { id: 4, name: 'Electronics and Communication Engineering' },
    { id: 5, name: 'Civil Engineering' },
    { id: 6, name: 'Chemical Engineering' },
    { id: 7, name: 'Aerospace Engineering' },
    { id: 8, name: 'Biomedical Engineering' },
    { id: 9, name: 'Environmental Engineering' },
    { id: 10, name: 'Industrial Engineering' },
    { id: 11, name: 'Materials Engineering' },
    { id: 12, name: 'Petroleum Engineering' },
    { id: 13, name: 'Robotics and Automation Engineering' },
    { id: 14, name: 'Nuclear Engineering' },
    { id: 15, name: 'Mechatronics Engineering' },
    { id: 16, name: 'Instrumentation Engineering' },
    { id: 17, name: 'Metallurgical Engineering' },
    { id: 18, name: 'Automotive Engineering' },
    { id: 19, name: 'Bioengineering' },
    { id: 20, name: 'Geotechnical Engineering' },
  ];
  
  
  export const specializationOptions = [
    {
      id: 1,
      department: 'Computer Science',
      specialization: ['Software Engineering', 'Computer Systems', 'Artificial Intelligence', 'Data Science', 'Cybersecurity', 'Computer Graphics'],
    },
    {
      id: 2,
      department: 'Mechanical Engineering',
      specialization: ['Thermodynamics', 'Fluid Mechanics', 'Solid Mechanics', 'Robotics', 'Automotive Engineering', 'Aerospace Engineering'],
    },
    {
      id: 3,
      department: 'Electrical Engineering',
      specialization: ['Power Systems', 'Control Systems', 'Electronics', 'Communications', 'Renewable Energy', 'Signal Processing'],
    },
    {
      id: 4,
      department: 'Electronics and Communication Engineering',
      specialization: ['Analog Electronics', 'Digital Electronics', 'Microelectronics', 'Communication Systems', 'VLSI Design', 'Embedded Systems'],
    },
    {
      id: 5,
      department: 'Civil Engineering',
      specialization: ['Structural Engineering', 'Geotechnical Engineering', 'Transportation Engineering', 'Environmental Engineering', 'Water Resources Engineering', 'Construction Management'],
    },
    {
      id: 6,
      department: 'Chemical Engineering',
      specialization: ['Process Engineering', 'Chemical Kinetics', 'Separation Processes', 'Polymer Engineering', 'Bioprocess Engineering', 'Environmental Engineering'],
    },
    {
      id: 7,
      department: 'Aerospace Engineering',
      specialization: ['Aerodynamics', 'Aircraft Design', 'Space Systems', 'Propulsion Systems', 'Avionics', 'Aerospace Structures'],
    },
    {
      id: 8,
      department: 'Biomedical Engineering',
      specialization: ['Biomechanics', 'Medical Imaging', 'Biomaterials', 'Bioinstrumentation', 'Rehabilitation Engineering', 'Medical Device Design'],
    },
    {
      id: 9,
      department: 'Environmental Engineering',
      specialization: ['Water and Wastewater Treatment', 'Air Pollution Control', 'Environmental Impact Assessment', 'Solid Waste Management', 'Sustainable Engineering'],
    },
    {
      id: 10,
      department: 'Industrial Engineering',
      specialization: ['Operations Research', 'Supply Chain Management', 'Quality Control', 'Production Planning', 'Ergonomics', 'Decision Analysis'],
    },
    {
      id: 11,
      department: 'Materials Engineering',
      specialization: ['Materials Science', 'Materials Characterization', 'Composite Materials', 'Nanomaterials', 'Metallurgy', 'Ceramic Engineering'],
    },
    {
      id: 12,
      department: 'Petroleum Engineering',
      specialization: ['Drilling Engineering', 'Reservoir Engineering', 'Production Engineering', 'Formation Evaluation', 'Well Testing', 'Enhanced Oil Recovery'],
    },
    {
      id: 13,
      department: 'Robotics and Automation Engineering',
      specialization: ['Robotics Control', 'Robotic Vision', 'Autonomous Systems', 'Human-Robot Interaction', 'Mobile Robotics', 'Robot Manipulation'],
    },
    {
      id: 14,
      department: 'Nuclear Engineering',
      specialization: ['Nuclear Reactor Design', 'Radiation Protection', 'Nuclear Power Systems', 'Fusion Energy', 'Nuclear Waste Management', 'Radiation Measurement'],
    },
    {
      id: 15,
      department: 'Mechatronics Engineering',
      specialization: ['Mechanical Design', 'Control Systems', 'Electronics', 'Robotics', 'Sensors and Actuators', 'Embedded Systems'],
    },
    {
      id: 16,
      department: 'Instrumentation Engineering',
      specialization: ['Transducers', 'Control Systems', 'Industrial Automation', 'Process Instrumentation', 'Biomedical Instrumentation', 'Data Acquisition Systems'],
    },
    {
      id: 17,
      department: 'Metallurgical Engineering',
      specialization: ['Extractive Metallurgy', 'Physical Metallurgy', 'Mechanical Metallurgy', 'Welding Engineering', 'Corrosion Engineering', 'Materials Characterization'],
    },
    {
      id: 18,
      department: 'Automotive Engineering',
      specialization: ['Automotive Design', 'Vehicle Dynamics', 'Powertrain Systems', 'Chassis Systems', 'Advanced Driver Assistance Systems', 'Electric and Hybrid Vehicles'],
    },
    {
      id: 19,
      department: 'Bioengineering',
      specialization: ['Biomechanics', 'Biomaterials', 'Biomedical Imaging', 'Tissue Engineering', 'Bioinstrumentation', 'Medical Robotics'],
    },
    {
      id: 20,
      department: 'Geotechnical Engineering',
      specialization: ['Soil Mechanics', 'Foundation Engineering', 'Slope Stability', 'Earthquake Engineering', 'Rock Mechanics', 'Ground Improvement'],
    },
  ];
  