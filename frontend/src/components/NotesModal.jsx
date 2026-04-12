import { useState } from "react";
import jsPDF from "jspdf";

function NotesModal({ newspaper, onClose }) {
  const [notes, setNotes] = useState("");

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text(`Notes - ${newspaper}`, 10, 10);
    pdf.text(notes, 10, 20);
    pdf.save(`${newspaper}-notes.pdf`);
  };

  return (
    <div className="modal">
      <h3>{newspaper} Notes</h3>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
      />

      <div className="modal-actions">
        <button onClick={downloadPDF}>Download PDF</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default NotesModal;