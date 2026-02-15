export default function SkillBadge({ name }) {
    return (
        <span className="
      px-3 py-1.5
      text-sm
      bg-white/10
      text-slate-200
      rounded-lg
      border border-white/10
      hover:bg-white/20
      transition
      cursor-default
    ">
      {name}
    </span>
    );
}
