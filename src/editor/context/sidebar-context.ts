/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

export const SidebarContext = React.createContext<{
  visible: boolean;
  nodeId?: string;
  setNodeId: (node: string | undefined) => void;
}>({ visible: false, setNodeId: () => {} });

export const IsSidebarContext = React.createContext<boolean>(false);