import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import Appfilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "John S.", salary: 800, increase: true, rise: false, id: 1},
                {name: "Alex D.", salary: 3000, increase: false, rise: true, id: 2},
                {name: "Sarah C.", salary: 4000, increase: false, rise: false, id: 3},
            ],
            tern: '',
            filter: ''

        }
        this.maxId = 4
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        if (name.length > 3 && salary) {
            const newItem = {
                name,
                salary,
                rise: false,
                increase: false,
                id: this.maxId++
            }
            this.setState(({data}) => {
                const newArr = [...data, newItem];
                return {
                    data: newArr
                }
            });
        }
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, tern) => {
        if (tern.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(tern) > -1
        })
    }

    onUpdateSearch = (tern) => {
        this.setState({tern});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items

        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    onFilterName = (filterName) => {
        this.setState({filterName})
    }

    render() {
        const {data, tern, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, tern), filter);
        

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <Appfilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployersList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployersAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;