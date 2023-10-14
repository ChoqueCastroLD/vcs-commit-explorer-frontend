import React from 'react';

const BranchSelect = ({ branches, selectedBranch, onBranchSelect }) => {
  return (
    <select
      className="select select-secondary w-full max-w-xs"
      value={selectedBranch}
      onChange={(e) => onBranchSelect(e.target.value)}
    >
      <option disabled>Select a branch</option>
      {branches.map((branch) => (
        <option key={branch.name} value={branch.name}>
          {branch.name}
        </option>
      ))}
    </select>
  );
};

export default BranchSelect;