import { Branch } from "../types/api.ts";


type BranchSelectProps = {
  branches: Branch[];
  selectedBranch: string;
  onBranchSelect: (branch: string) => void;
}
const BranchSelect = ({ branches, selectedBranch, onBranchSelect }: BranchSelectProps) => {
  return branches.length > 0 && (
    <select
      className="select select-secondary w-full max-w-xs m-4"
      value={selectedBranch}
      onChange={(e) => onBranchSelect(e.target.value)}
    >
      <option disabled>Select a branch</option>
      {branches.map((branch: { name: string }) => (
        <option key={branch.name} value={branch.name}>
          {branch.name}
        </option>
      ))}
    </select>
  );
};

export default BranchSelect;
