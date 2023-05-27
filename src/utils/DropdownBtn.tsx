import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import { useToggle } from './helpers/hooks';
import './DropdownBtn.scss';

export type DropdownBtnProps = PropsWithChildren<{
  text: string;
  disabled?: boolean;
  className?: string;
  dropdownClassName?: string;
  right?: boolean;
  inline?: boolean;
  minWidth?: number;
}>;

export const DropdownBtn: FC<DropdownBtnProps> = (
  { text, disabled = false, className, children, dropdownClassName, right = false, minWidth, inline },
) => {
  const [isOpen, toggle] = useToggle();
  const toggleClasses = classNames('dropdown-btn__toggle', className, { 'btn-block': !inline });
  const style = { minWidth: minWidth && `${minWidth}px` };

  return (
    <Dropdown isOpen={isOpen} toggle={toggle} disabled={disabled} className={dropdownClassName}>
      <DropdownToggle caret className={toggleClasses} color="primary">{text}</DropdownToggle>
      <DropdownMenu className="w-100" end={right} style={style}>{children}</DropdownMenu>
    </Dropdown>
  );
};
