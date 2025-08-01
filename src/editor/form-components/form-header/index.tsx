import { useContext, useState } from 'react';
import { useClientContext, CommandService, Field, FieldRenderProps, FlowNodeEntity } from '@flowgram.ai/free-layout-editor';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@app/components/ui/dropdown-menu';
import { ChevronDown, ChevronLeft, X, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { cn } from '@app/lib/utils';
import { Feedback } from '../feedback';

interface FormHeaderProps {
  node: FlowNodeEntity;
  expanded?: boolean;
  toggleExpand?: () => void;
  readonly?: boolean;
  isSidebar?: boolean;
  onClose?: () => void;
}

const getIcon = (node: FlowNodeEntity) => {
  const icon = node.getNodeRegistry().info?.icon;
  if (!icon) return null;
  return <img src={icon} className="w-6 h-6 rounded" alt="" />;
};

export function FormHeader({ node, expanded, toggleExpand, readonly, isSidebar, onClose }: FormHeaderProps) {
  const [titleEdit, setTitleEdit] = useState<boolean>(false);
  const ctx = useClientContext();

  const handleExpand = (e: React.MouseEvent) => {
    toggleExpand?.();
    e.stopPropagation();
  };

  const handleDelete = () => {
    ctx.get<CommandService>(CommandService).executeCommand('delete', [node]);
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-gradient-to-b from-indigo-50 to-gray-50 rounded-t-lg cursor-move">
      {getIcon(node)}
      
      <div className="flex-1 min-w-0">
        <Field name="title">
          {({ field: { value, onChange }, fieldState }: FieldRenderProps<string>) => (
            <div>
              {titleEdit && !readonly ? (
                <Input
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={() => setTitleEdit(false)}
                  autoFocus
                  className="h-6 text-sm"
                />
              ) : (
                <span className="text-sm font-medium truncate block">{value}</span>
              )}
              <Feedback errors={fieldState?.errors} />
            </div>
          )}
        </Field>
      </div>

      {node.renderData.expandable && !isSidebar && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExpand}
          className="h-6 w-6 p-0"
        >
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      )}

      {!readonly && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTitleEdit(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Title
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {isSidebar && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}