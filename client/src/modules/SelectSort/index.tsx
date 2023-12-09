import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Select, SelectItem, SelectProps } from "@nextui-org/react";

export interface SelectItem {
  key: string;
  value: string;
}

export interface SelectConfig {
  defaultKey: string;
  items: SelectItem[];
  disabledKeys?: string[];
  searchParamName: string;
}

export interface SelectSortProps {
  sortConfig: SelectConfig;
  className?: string;
  onChange?: Pick<SelectProps, "onChange">;
}

const SelectSort: FC<SelectSortProps> = ({
  sortConfig: { defaultKey, items, disabledKeys, searchParamName, },
  className,
  onChange,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get(searchParamName);
  const [itemKey, setItemKey] = useState<string>(
    items.some((item) => item.key === sort) && sort !== null
      ? sort
      : defaultKey,
  );

  return (
    <Select
      size="sm"
      className={`max-w-max ${className}`}
      selectedKeys={[itemKey]}
      disabledKeys={disabledKeys}
      aria-label="filter"
      disallowEmptySelection
      items={items}
      onChange={(select) => {
        setItemKey(select.target.value);
        setSearchParams((params) => {
          params.set(searchParamName, select.target.value);
          return params;
        });
        onChange;
      }}
      startContent={<span className="material-symbols-rounded">sort</span>}
      classNames={{
        popoverContent: "bg-background",
        trigger: "shadow-none py-0 min-h-10 h-8",
        value: "pl-1",
      }}
    >
      {(item) => <SelectItem key={item.key}>{item.value}</SelectItem>}
    </Select>
  );
};

export default SelectSort;
