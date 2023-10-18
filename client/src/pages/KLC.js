import React, { useState } from 'react';

// Component/Page imports
import Page from '../components/Page';

// Data imports
// import { klcAnswers } from '../data/klcAnswers';
// import { klcData } from '../data/klcData';

// Function Imports
import { klcMissedQuestions } from '../functions/klcFx';


const Klc = () => {
// ----- State variable for selected module number
const [selectedModule, setSelectedModule] = useState(2); // Initial value is 2

// ----- KLC Data + Fx
const [moduleData, setModuleData] = useState(
  klcMissedQuestions(selectedModule, klcData, klcAnswers)
);

// ----- Function to handle button clicks
const handleModuleChange = (moduleNumber) => {
  setSelectedModule(moduleNumber);
  setModuleData(klcMissedQuestions(moduleNumber, klcData, klcAnswers));
};

// ----- Page Variables
const pageTitle = "KLC Analytics";

const analysisButtons = [
  { id: 0, name: "Module 1 Most missed questions", data: moduleData },
  { id: 1, name: "Module 2 Most missed questions", data: moduleData },
  { id: 2, name: "Module 3 Most missed questions", data: moduleData },
  { id: 3, name: "Module 4 Most missed questions", data: moduleData },
  { id: 4, name: "Module 5 Most missed questions", data: moduleData },
  { id: 5, name: "Module 6 Most missed questions", data: moduleData },
  { id: 6, name: "Module 7 Most missed questions", data: moduleData },
  { id: 7, name: "Module 8 Most missed questions", data: moduleData },
  { id: 8, name: "Module 9 Most missed questions", data: moduleData },
  { id: 9, name: "Module 10 Most missed questions", data: moduleData },
  { id: 10, name: "Module 11 Most missed questions", data: moduleData },
  { id: 11, name: "Module 12 Most missed questions", data: moduleData },
  { id: 12, name: "Module 13 Most missed questions", data: moduleData },
  { id: 13, name: "Module 14 Most missed questions", data: moduleData },
  { id: 14, name: "Module 15 Most missed questions", data: moduleData },
  { id: 15, name: "Module 16 Most missed questions", data: moduleData },
  { id: 16, name: "Module 17 Most missed questions", data: moduleData },
  { id: 17, name: "Module 18 Most missed questions", data: moduleData },
  { id: 18, name: "Module 19 Most missed questions", data: moduleData },
  { id: 19, name: "Module 20 Most missed questions", data: moduleData },
  { id: 20, name: "Module 21 Most missed questions", data: moduleData },
  { id: 21, name: "Module 22 Most missed questions", data: moduleData },
  { id: 22, name: "Module 23 Most missed questions", data: moduleData },
  { id: 23, name: "Module 24 Most missed questions", data: moduleData },
  { id: 24, name: "Module 25 Most missed questions", data: moduleData },
  { id: 25, name: "Module 26 Most missed questions", data: moduleData },
  { id: 26, name: "Module 27 Most missed questions", data: moduleData },
  { id: 27, name: "Module 28 Most missed questions", data: moduleData },
];

return (
  <section>
    <h1>{pageTitle}</h1>
    <div>
      <button onClick={() => handleModuleChange(1)}>Module 1</button>
      <button onClick={() => handleModuleChange(2)}>Module 2</button>
      <button onClick={() => handleModuleChange(3)}>Module 3</button>
      <button onClick={() => handleModuleChange(4)}>Module 4</button>
      <button onClick={() => handleModuleChange(5)}>Module 5</button>
      <button onClick={() => handleModuleChange(6)}>Module 6</button>
      <button onClick={() => handleModuleChange(7)}>Module 7</button>
      <button onClick={() => handleModuleChange(8)}>Module 8</button>
      <button onClick={() => handleModuleChange(9)}>Module 9</button>
      <button onClick={() => handleModuleChange(10)}>Module 10</button>
      <button onClick={() => handleModuleChange(11)}>Module 11</button>
      <button onClick={() => handleModuleChange(12)}>Module 12</button>
      <button onClick={() => handleModuleChange(13)}>Module 13</button>
      <button onClick={() => handleModuleChange(14)}>Module 14</button>
      <button onClick={() => handleModuleChange(15)}>Module 15</button>
      <button onClick={() => handleModuleChange(16)}>Module 16</button>
      <button onClick={() => handleModuleChange(17)}>Module 17</button>
      <button onClick={() => handleModuleChange(18)}>Module 18</button>
      <button onClick={() => handleModuleChange(19)}>Module 19</button>
      <button onClick={() => handleModuleChange(20)}>Module 20</button>
      <button onClick={() => handleModuleChange(21)}>Module 21</button>
      <button onClick={() => handleModuleChange(22)}>Module 22</button>
      <button onClick={() => handleModuleChange(23)}>Module 23</button>
      <button onClick={() => handleModuleChange(24)}>Module 24</button>
      <button onClick={() => handleModuleChange(25)}>Module 25</button>
      <button onClick={() => handleModuleChange(26)}>Module 26</button>
      <button onClick={() => handleModuleChange(27)}>Module 27</button>
      <button onClick={() => handleModuleChange(28)}>Module 28</button>

    </div>
    <Page pageTitle={pageTitle} buttons={analysisButtons} />
  </section>
);
};

export default Klc;