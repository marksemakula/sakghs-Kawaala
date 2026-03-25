import React, { ComponentType } from 'react';
import * as FiIcons from 'react-icons/fi';
import { FiAlertTriangle } from 'react-icons/fi';

interface SafeIconProps extends Record<string, unknown> {
  icon?: ComponentType<Record<string, unknown>>;
  name?: string;
}

const SafeIcon: React.FC<SafeIconProps> = ({ icon, name, ...props }) => {
  let IconComponent: ComponentType<Record<string, unknown>> | null = null;
  try {
    IconComponent =
      icon ??
      (name
        ? ((FiIcons as Record<string, ComponentType<Record<string, unknown>>>)[`Fi${name}`] ?? null)
        : null);
  } catch {
    IconComponent = null;
  }

  return IconComponent
    ? React.createElement(IconComponent, props)
    : <FiAlertTriangle {...(props as React.SVGProps<SVGSVGElement>)} />;
};

export default SafeIcon;
