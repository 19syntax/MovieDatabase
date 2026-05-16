interface SortDropdownProps {
  onSortChange: (sort: string) => void;
}
export const SortDropdown = ({ onSortChange }: SortDropdownProps) => {
  const sortBy = [
    "Popularity (High to Low)",
    "Rating (High to Low)",
    "Rating (Low to High)",
    "Release Date (Newest First)",
    "Release Date (Oldest First)",
    "Title (A-Z)",
    "Title (Z-A)",
  ];
  return (
    <div>
      <select onChange={(e) => onSortChange(e.target.value)}>
        <option key="default" value="">
          Sort by...
        </option>
        {sortBy.map((sort) => (
          <option key={sort} value={sort}>
            {sort}
          </option>
        ))}
      </select>
    </div>
  );
};
