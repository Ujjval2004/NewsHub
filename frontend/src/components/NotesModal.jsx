import { useState } from "react";
import jsPDF from "jspdf";

function NotesModal({ onClose }) {
  const [notes, setNotes] = useState("");

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("My Notes", 10, 10);

    const splitText = pdf.splitTextToSize(notes, 180); // prevents overflow
    pdf.text(splitText, 10, 20);

    pdf.save("notes.pdf");
  };

  return (
    <div className="modal">
      <h3>Take Notes</h3>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
      />

      <div className="modal-actions">
        <button onClick={downloadPDF}>Download Notes</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default NotesModal;