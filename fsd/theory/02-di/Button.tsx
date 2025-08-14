
// shared

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    // Здесь можно добавить свои кастомные пропсы
    // variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  ...rest
                                              }) => {
    return (
        <button {...rest}>
            {children}
        </button>
    );
};