// Importa i componenti necessari
import Checkboxe from "./Checkboxe"
import Input from "./Input"
import MenuCMDK from "./MenuCMDK"

// Importa l'hook useState da React
import { useState } from "react"

// Definisce il componente Card
export default function Card() {
    // Crea uno stato per il valore dell'input
    const [value, setValue] = useState("")

    // Definisce una funzione per gestire il cambiamento dell'input
    const handleInputChange = (inputValue) => {
        // Aggiorna lo stato con il nuovo valore dell'input
        // Il problema è che il valore dell'input non viene passato correttamente !(non viene proprio passato)
        setValue(inputValue)
        // console.log(value) -> value è sempre vuota
    }

    // Restituisce il componente Card
    return (
        <div className="lg:col-start-3 lg:row-end-1">
            <h2 className="sr-only">Card</h2>
            <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                    <div className="flex-auto pl-6 pt-6">
                        <dt className="text-xl subpixel-antialiased font-black leading-6 text-gray-900">
                            Lista della spesa
                        </dt>
                        <dd className="text-sm antialiased font-normal leading-6 text-gray-700">
                            A utility-first list of groceries to prepare meal
                            for the week.
                        </dd>
                        <MenuCMDK /> {/* Renderizza il componente MenuCMDK */}
                    </div>
                    <div className="mt-1 flex w-full flex-none gap-x-4 px-6 pt-6">
                        <Input onInputChange={handleInputChange} />{" "}
                        {/* Renderizza il componente Input e passa la funzione handleInputChange come prop */}
                    </div>
                </dl>
                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                    <Checkboxe value={value} />{" "}
                    {/* Renderizza il componente Checkboxe e passa il valore corrente come prop */}
                </div>
            </div>
        </div>
    )
}
