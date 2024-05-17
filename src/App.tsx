import { ChangeEventHandler, useEffect, useState } from "react";
import { NoteItem } from "./components/NoteItem"
import axios from "axios";

interface noteType {
  id: string, title: string, description?: string
}
export const App = () => {
  const [noteToView, setNoteToView] = useState<noteType>();
  const [notes, setNotes] = useState<noteType[]>([]);
  const [values, setValues] = useState({
    title: "",
    description: ""
  })

  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  }

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await axios('https://noteservedev.netlify.app/note');
      setNotes(data.notes);
    }
    console.log('App rendered')
    fetchNotes();
  }, [])

  return (
    <div className="max-w-3xl mx-auto space-x-6 ">
      <form onSubmit={async (evt) => {
        evt.preventDefault();
        if (selectedNoteId) {
          const { data } = await axios.patch('https://noteservedev.netlify.app/note/' + selectedNoteId, {
            title: values.title,
            description: values.description
          })
          const updatedNotes = notes.map((note) => {
            if (note.id === selectedNoteId) {
              note.title = data.note.title;
              note.description = data.note.description;
            }
            return note;
          });
          setNotes([...updatedNotes]);
          setValues({ title: "", description: "" })
          return;
        }
        const { data } = await axios.post('https://noteservedev.netlify.app/note/create', {
          title: values.title,
          description: values.description
        })
        setNotes([...notes, data.note])
        setValues({ title: "", description: "" })
      }} className=" bg-white shadow-md rounded p-5 space-y-6">
        <h1 className="font-semibold text-xxl text-center">Note Application</h1>
        <div className="">
          <input
            onChange={handleChange}
            className="w-full border-b-2 border-gray-700 outline-none"
            type="text"
            placeholder="Title"
            name="title"
            value={values.title}
          />
        </div>
        <div>
          <textarea
            onChange={handleChange}
            name="description"
            value={values.description}
            className="w-full border-b-2 border-gray-700 outline-none resize-none h-36"
            placeholder="Enter your note"
          ></textarea>
        </div>
        <div className="text-right">
          <button
            className="bg-blue-500 text-white px-5 py-2"
          >Submit</button>
        </div>
      </form>
      {/* Note Items */}
      {
        notes.map((note, index) => {
          return <NoteItem
            key={index}
            title={note.title}
            onViewClick={() => {
              if (noteToView) {
                setNoteToView(note === noteToView ? undefined : note);
              } else {
                setNoteToView(note);
              }
            }}
            description={noteToView?.id === note.id ? noteToView?.description : ""}
            onEditClick={() => {
              setSelectedNoteId(note.id)
              setValues({ title: note.title, description: note.description || "" })
            }}
            onDelete={async () => {
              const result = confirm("Are you sure you want to delete this note?");
              if (result) {
                await axios.delete('https://noteservedev.netlify.app/note/' + note.id)
                const updatedNotes = notes.filter(({ id }) => id !== note.id);
                setNotes([...updatedNotes]);
              }
            }}
          />
        })
      }
    </div >
  )
}

