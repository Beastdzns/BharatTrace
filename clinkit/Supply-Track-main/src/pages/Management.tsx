import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {
    ArrowRight,
    Box,
    Car,
    RefreshCw,
    Search,
} from "lucide-react";

// Item interface
interface Item {
    id: string;
    name: string;
    details: string;
    stock: number;
    state: 'Created' | 'Manufactured' | 'Shipped' | 'Received' | 'Delivered';
    location: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
}

const navItems = [
    { name: "Overview", icon: Box },
    { name: "Create Item", icon: ArrowRight },
    { name: "View Item", icon: Search },
    { name: "Update Item", icon: RefreshCw },
];


const InventoryManagementSystem: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [activeSection, setActiveSection] = useState<string>('Overview');

    // Overview - No specific state needed here, using items state

    // Create Item section states
    const [createItemName, setCreateItemName] = useState<string>('');
    const [createItemDetails, setCreateItemDetails] = useState<string>('');
    const [createItemStock, setCreateItemStock] = useState<number>(0);
    const [createItemLocation, setCreateItemLocation] = useState<string>('');
    const [createItemOwner, setCreateItemOwner] = useState<string>('');

    // View Item section states
    const [viewItemId, setViewItemId] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    // Update Item section states
    const [updateItemId, setUpdateItemId] = useState<string>('');
    const [updateItemName, setUpdateItemName] = useState<string>('');
    const [updateItemDetails, setUpdateItemDetails] = useState<string>('');
    const [updateItemStock, setUpdateItemStock] = useState<number>(0);
    const [updateItemState, setUpdateItemState] = useState<Item['state']>('Created');
    const [updateItemLocation, setUpdateItemLocation] = useState<string>('');
    const [updateItemOwner, setUpdateItemOwner] = useState<string>('');


    useEffect(() => {
        loadItemsFromStorage();
    }, []);

    useEffect(() => {
        saveItemsToStorage();
    }, [items]);

    const loadItemsFromStorage = () => {
        const storedItems = localStorage.getItem('inventoryItems');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    };

    const saveItemsToStorage = () => {
        localStorage.setItem('inventoryItems', JSON.stringify(items));
    };

    // --- Section Handlers ---

    const handleSectionChange = (sectionName: string) => {
        setActiveSection(sectionName);
        setSelectedItem(null); // Clear selected item when section changes
    };

    // --- Create Item Handlers ---
    const handleCreateItem = () => {
      if (!createItemName ) { // Details, location and owner can be empty but name must be there.
          alert('Please fill in item name.');
          return;
      }

      const existingItemIndex = items.findIndex(item => item.name === createItemName);

      if (existingItemIndex > -1) {
          // Item with the same name exists, so update the stock
          const updatedItems = items.map((item, index) => {
              if (index === existingItemIndex) {
                  return {
                      ...item,
                      stock: item.stock + createItemStock,
                      updatedAt: new Date().toISOString(),
                  };
              }
              return item;
          });
          setItems(updatedItems);
          alert(`Stock quantity for '${createItemName}' updated successfully!`);
      } else {
          // Item with the name does not exist, create new item
          const newItem: Item = {
              id: Date.now().toString(),
              name: createItemName,
              details: createItemDetails,
              stock: createItemStock,
              state: 'Created', // Default state
              location: createItemLocation,
              owner: createItemOwner,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
          };
          setItems([...items, newItem]);
          alert(`Item '${createItemName}' created successfully!`);
      }

      clearCreateItemForm();
  };


    const clearCreateItemForm = () => {
        setCreateItemName('');
        setCreateItemDetails('');
        setCreateItemStock(0);
        setCreateItemLocation('');
        setCreateItemOwner('');
    };

    // --- View Item Handlers ---
    const handleViewItem = () => {
        const item = items.find(item => item.id === viewItemId);
        if (item) {
            setSelectedItem(item);
        } else {
            alert('Item not found.');
            setSelectedItem(null);
        }
    };

    // --- Update Item Handlers ---
    const handleUpdateItem = () => {
        const itemIndex = items.findIndex(item => item.id === updateItemId);
        if (itemIndex === -1) {
            alert('Item not found for update.');
            return;
        }

        const updatedItem: Item = {
            ...items[itemIndex],
            name: updateItemName || items[itemIndex].name, // Keep old name if new is empty
            details: updateItemDetails || items[itemIndex].details,
            stock: updateItemStock !== undefined ? updateItemStock : items[itemIndex].stock, // Keep old stock if new is undefined
            state: updateItemState,
            location: updateItemLocation || items[itemIndex].location,
            owner: updateItemOwner || items[itemIndex].owner,
            updatedAt: new Date().toISOString(),
        };

        const newItems = [...items];
        newItems[itemIndex] = updatedItem;
        setItems(newItems);
        clearUpdateItemForm();
        alert('Item updated successfully!');
    };

    const clearUpdateItemForm = () => {
        setUpdateItemId('');
        setUpdateItemName('');
        setUpdateItemDetails('');
        setUpdateItemStock(0);
        setUpdateItemState('Created');
        setUpdateItemLocation('');
        setUpdateItemOwner('');
    };


    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="container mx-auto p-6">
                <div className="flex gap-6">
                    {/* Sidebar */}
                    <aside className="w-1/4 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 bg-gray-700">
                            <h2 className="text-xl font-bold text-white">Inventory Dashboard</h2>
                        </div>
                        <nav className="p-4">
                            {navItems.map(({ name, icon: Icon }) => (
                                <button
                                    key={name}
                                    onClick={() => handleSectionChange(name)}
                                    className={`w-full mb-2 p-3 rounded-lg text-left flex items-center gap-3 transition-all
                                        ${activeSection === name
                                            ? "bg-gray-600 text-white font-semibold"
                                            : "hover:bg-gray-700 text-gray-300"
                                        }`}
                                >
                                    <Icon size={18} />
                                    {name}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {activeSection === 'Overview' && (
                            <section className="space-y-6">
                                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                                    <h2 className="text-2xl font-bold mb-4 text-gray-100">Inventory Overview</h2>
                                    {items.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full table-auto text-left">
                                                <thead className="text-gray-300">
                                                    <tr>
                                                        <th className="px-4 py-2">ID</th>
                                                        <th className="px-4 py-2">Name</th>
                                                        <th className="px-4 py-2">Stock</th>
                                                        <th className="px-4 py-2">State</th>
                                                        <th className="px-4 py-2">Location</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-gray-100">
                                                    {items.map(item => (
                                                        <tr key={item.id} className="border-b border-gray-700">
                                                            <td className="px-4 py-3">{item.id}</td>
                                                            <td className="px-4 py-3">{item.name}</td>
                                                            <td className="px-4 py-3">{item.stock}</td>
                                                            <td className="px-4 py-3">{item.state}</td>
                                                            <td className="px-4 py-3">{item.location}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p className="text-gray-400">No items in inventory yet.</p>
                                    )}
                                </div>

                                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-100">Stock Level Chart</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={items.map(item => ({ name: item.name, stock: item.stock }))}>
                                            <XAxis dataKey="name" stroke="#ddd" />
                                            <YAxis stroke="#ddd" />
                                            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                                            <Legend wrapperStyle={{ color: '#ddd' }} />
                                            <Bar dataKey="stock" fill="#8884d8" radius={[5, 5, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </section>
                        )}

                        {activeSection === 'Create Item' && (
                            <section className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
                                <h2 className="text-2xl font-bold text-gray-100">Create New Item</h2>
                                <input
                                    type="text"
                                    placeholder="Item Name"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                                    value={createItemName}
                                    onChange={(e) => setCreateItemName(e.target.value)}
                                />
                                <textarea
                                    placeholder="Item Details"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 h-24"
                                    value={createItemDetails}
                                    onChange={(e) => setCreateItemDetails(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Stock Quantity"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                                    value={createItemStock}
                                    onChange={(e) => setCreateItemStock(Number(e.target.value))}
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                                    value={createItemLocation}
                                    onChange={(e) => setCreateItemLocation(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Owner"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                                    value={createItemOwner}
                                    onChange={(e) => setCreateItemOwner(e.target.value)}
                                />
                                <button
                                    onClick={handleCreateItem}
                                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                                >
                                    Create Item
                                </button>
                            </section>
                        )}

                        {activeSection === 'View Item' && (
                            <section className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
                                <h2 className="text-2xl font-bold text-gray-100">View Item Details</h2>
                                <input
                                    type="text"
                                    placeholder="Enter Item ID"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                                    value={viewItemId}
                                    onChange={(e) => setViewItemId(e.target.value)}
                                />
                                <button
                                    onClick={handleViewItem}
                                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                                >
                                    View Item
                                </button>

                                {selectedItem && (
                                    <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                                        <h3 className="text-xl font-semibold text-gray-100 mb-2">{selectedItem.name}</h3>
                                        <p><span className="font-bold text-gray-300">Details:</span> {selectedItem.details}</p>
                                        <p><span className="font-bold text-gray-300">Stock:</span> {selectedItem.stock}</p>
                                        <p><span className="font-bold text-gray-300">State:</span> {selectedItem.state}</p>
                                        <p><span className="font-bold text-gray-300">Location:</span> {selectedItem.location}</p>
                                        <p><span className="font-bold text-gray-300">Owner:</span> {selectedItem.owner}</p>
                                        <p><span className="font-bold text-gray-300">Created At:</span> {new Date(selectedItem.createdAt).toLocaleString()}</p>
                                        <p><span className="font-bold text-gray-300">Updated At:</span> {new Date(selectedItem.updatedAt).toLocaleString()}</p>
                                    </div>
                                )}
                            </section>
                        )}

                        {activeSection === 'Update Item' && (
                            <section className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
                                <h2 className="text-2xl font-bold text-gray-100">Update Item Details</h2>
                                <input
                                    type="text"
                                    placeholder="Item ID to Update"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                                    value={updateItemId}
                                    onChange={(e) => setUpdateItemId(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="New Name (Optional)"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                                    value={updateItemName}
                                    onChange={(e) => setUpdateItemName(e.target.value)}
                                />
                                <textarea
                                    placeholder="New Details (Optional)"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 h-24"
                                    value={updateItemDetails}
                                    onChange={(e) => setUpdateItemDetails(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="New Stock (Optional)"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                                    value={updateItemStock}
                                    onChange={(e) => setUpdateItemStock(Number(e.target.value))}
                                />
                                <select
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                                    value={updateItemState}
                                    onChange={(e) => setUpdateItemState(e.target.value as Item['state'])}
                                >
                                    <option value="Created">Created</option>
                                    <option value="Manufactured">Manufactured</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Received">Received</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="New Location (Optional)"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                                    value={updateItemLocation}
                                    onChange={(e) => setUpdateItemLocation(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="New Owner (Optional)"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                                    value={updateItemOwner}
                                    onChange={(e) => setUpdateItemOwner(e.target.value)}
                                />
                                <button
                                    onClick={handleUpdateItem}
                                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                                >
                                    Update Item
                                </button>
                            </section>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default InventoryManagementSystem;