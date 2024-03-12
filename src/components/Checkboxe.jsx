// products.name è dove devo mettere la value per passare il valore dell'input al componente Checkboxe

const products = [
    { id: 1, name: "" },
    { id: 2, name: "" },
    { id: 3, name: "" },
    { id: 4, name: "" },
    { id: 5, name: "" },
]

export default function Checkboxe() {
    return (
        <fieldset>
            <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                {products.map((product, productIdx) => (
                    <div
                        key={productIdx}
                        className="relative flex items-start py-4"
                    >
                        <div className="min-w-0 flex-1 text-sm leading-6">
                            <label
                                htmlFor={`person-${product.id}`}
                                className="select-none font-medium text-gray-900"
                            >
                                {product.name}
                            </label>
                        </div>
                        <div className="ml-3 flex h-6 items-center">
                            <input
                                id={`person-${product.id}`}
                                name={`person-${product.id}`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </fieldset>
    )
}
