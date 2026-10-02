const labels = {
  "About Me": "",
  "Skills and Tools": "MY TOOLKIT",
  Certificates: "ALWAYS LEARNING",
  "Get In Touch": "LET’S MAKE SOMETHING",
};
export default function SectionHeader({ title, subtitle }) {
  const label = labels[title] ?? "ADNAN MAKAHHAL / PORTFOLIO";

  return (
    <div className="editorial-section-heading">
      <h2>
        {title}
        <span>.</span>
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
