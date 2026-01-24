import type React from "react";

type MemberDetailRightProps<T> = {
  items: T[];
  emptyLabel: string;
  emptyClassName?: string;
  containerClassName?: string;
  renderItem: (item: T, index: number) => React.ReactNode;
};

export function MemberDetailRight<T>({
  items,
  emptyLabel,
  emptyClassName,
  containerClassName,
  renderItem,
}: MemberDetailRightProps<T>) {
  if (!items.length) {
    return (
      <p className={`text-muted-foreground ${emptyClassName ?? ""}`}>
        {emptyLabel}
      </p>
    );
  }

  return (
    <div className={containerClassName}>
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
}
