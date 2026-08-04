import { GRADE_OPTIONS, getGradeStatusClass, getGradeStatusColor, getGradeBand } from "../../utils/gpaCalculator";

export default function GradeScaleView() {
  return (
    <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "24px 20px" }}>
      <h1 className="page-title">Grade Scale Reference</h1>
      <p className="page-subtitle">Standard grade-to-GPA point conversion used in calculations</p>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="grade-scale-table" style={{ width: "100%", borderCollapse: "collapse" }} aria-label="Grade scale reference">
            <thead>
              <tr>{["Grade", "Quality Points", "Description", "Band"].map((h) => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {GRADE_OPTIONS.map((g) => (
                <tr key={g.letter}>
                  <td>
                    <span className={getGradeStatusClass(g.points)} style={{ display: "inline-block", padding: "2px 8px", borderRadius: 99, fontSize: 12, fontWeight: 700 }}>
                      {g.letter}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{g.points.toFixed(1)}</td>
                  <td style={{ color: "var(--gray-500)" }}>{g.description}</td>
                  <td style={{ color: getGradeStatusColor(g.points), fontWeight: 600, fontSize: 12 }}>{getGradeBand(g.points)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ marginTop: 20, background: "var(--gray-50)", border: "1px solid var(--gray-200)", borderRadius: "var(--r-lg)", padding: "14px 18px" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>GPA Formula</p>
        <p style={{ fontSize: 13, color: "var(--gray-500)", fontFamily: "monospace", background: "var(--white)", display: "inline-block", padding: "4px 10px", borderRadius: "var(--r)", border: "1px solid var(--gray-200)" }}>
          GPA = Σ(Quality Points) ÷ Σ(Credit Hours)
        </p>
      </div>
    </div>
  );
}
