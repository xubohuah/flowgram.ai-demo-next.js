import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@app/components/ui/tooltip';
import { cn } from '@app/lib/utils';

interface FormItemProps {
  children: React.ReactNode;
  name: string;
  type?: string;
  required?: boolean;
  description?: string;
  labelWidth?: number;
  labelStyle?: React.CSSProperties;
  vertical?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const TypeTag = ({ type }: { type: string }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'string':
        return 'bg-green-100 text-green-700';
      case 'number':
        return 'bg-blue-100 text-blue-700';
      case 'boolean':
        return 'bg-purple-100 text-purple-700';
      case 'object':
        return 'bg-orange-100 text-orange-700';
      case 'array':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={cn("px-1.5 py-0.5 text-xs rounded", getTypeColor(type))}>
      {type}
    </span>
  );
};

export function FormItem({
  children,
  name,
  required,
  description,
  type,
  labelWidth = 118,
  labelStyle,
  vertical,
  style,
  className,
}: FormItemProps): JSX.Element {
  const renderTitle = () => (
    <div className="flex flex-1 min-w-0">
      <span className="truncate">
        {name}
        {required && <span className="text-red-500 pl-0.5">*</span>}
      </span>
    </div>
  );

  return (
    <div
      className={cn(
        "text-xs mb-1.5 w-full relative flex gap-2",
        vertical ? "flex-col" : "items-center",
        className
      )}
      style={style}
    >
      <div
        className="flex items-center gap-1 shrink-0"
        style={{
          width: labelWidth,
          minWidth: labelWidth,
          maxWidth: labelWidth,
          ...labelStyle,
        }}
      >
        {type && <TypeTag type={type} />}
        {description ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {renderTitle()}
              </TooltipTrigger>
              <TooltipContent>
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          renderTitle()
        )}
      </div>

      <div className="flex-grow min-w-0">
        {children}
      </div>
    </div>
  );
}