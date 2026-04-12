export const downloadNotesTxt = (req, res) => {
  const { notes } = req.body;

  if (!notes) {
    return res.status(400).json({ message: "No notes provided" });
  }

  res.setHeader("Content-Type", "text/plain");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=notes.txt"
  );

  res.send(notes);
};