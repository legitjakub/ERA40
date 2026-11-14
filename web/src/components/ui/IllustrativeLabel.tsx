type Props = {
  className?: string;
};

export function IllustrativeLabel({ className = "" }: Props) {
  return (
    <span className={`badge badge-illustrative ${className}`.trim()}>
      ILLUSTRATIVE IMAGE
    </span>
  );
}
