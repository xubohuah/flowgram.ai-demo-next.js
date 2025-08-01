/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';
import {
  Play,
  Square,
  GitBranch,
  MessageSquare,
  Code2,
  Globe,
  RotateCw,
  ArrowRight,
  XCircle,
  BoxSelect,
  Layers,
  Bot,
} from 'lucide-react';

export const NodeIcons = {
  start: <Play className="w-4 h-4" />,
  end: <Square className="w-4 h-4" />,
  condition: <GitBranch className="w-4 h-4" />,
  comment: <MessageSquare className="w-4 h-4" />,
  code: <Code2 className="w-4 h-4" />,
  http: <Globe className="w-4 h-4" />,
  loop: <RotateCw className="w-4 h-4" />,
  continue: <ArrowRight className="w-4 h-4" />,
  break: <XCircle className="w-4 h-4" />,
  blockStart: <BoxSelect className="w-4 h-4" />,
  blockEnd: <Layers className="w-4 h-4" />,
  llm: <Bot className="w-4 h-4" />,
};