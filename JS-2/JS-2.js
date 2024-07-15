class Seat {
    constructor() {
      this.status = 'Available';
    }
  
    reserve() {
      if (this.status === 'Available') {
        this.status = 'Reserved';
      } else {
        console.log('Seat cannot be reserved.');
      }
    }
  
    getStatus() {
      return this.status;
    }
  
    getStatusColor() {
      switch (this.status) {
        case 'Available':
          return '\x1b[32mAvailable\x1b[0m'; // Cyan
        case 'Reserved':
          return '\x1b[31mReserved\x1b[0m';  // Red
        default:
          return this.status;
      }
    }
  }
  
  class Cinema {
    constructor() {
      this.columns = ['A', 'B', 'C', 'D'];
      this.rows = Array.from({ length: 9 }, (_, i) => i + 1);
      this.seats = this.initializeSeats();
    }
  
    initializeSeats() {
      return this.columns.reduce((acc, col) => {
        acc[col] = this.rows.reduce((rowAcc, row) => {
          rowAcc[row] = new Seat();
          return rowAcc;
        }, {});
        return acc;
      }, {});
    }
  
    reserve(column, row) {
      const seat = this.findSeat(column, row);
      if (seat) {
        seat.reserve();
      } else {
        console.log('Invalid seat selection.');
      }
    }
  
    findSeat(column, row) {
      return this.seats[column]?.[row] || null;
    }
  
    showCinema() {
      console.log('Cinema Seating:');
      this.columns.forEach(col => {
        const rowStatus = this.rows.map(row => `${col}${row}: ${this.seats[col][row].getStatusColor()}`);
        console.log(rowStatus.join(' | '));
      });
    }
  
    getSeatsByStatus(status) {
      return this.columns.flatMap(col => 
        this.rows
          .filter(row => this.seats[col][row].getStatus() === status)
          .map(row => `${col}${row}`)
      );
    }
  }
  
  function main() {
    const cinema = new Cinema();
    cinema.reserve('A', 2);
    cinema.reserve('D', 1);
    cinema.showCinema();
  
    const availableSeats = cinema.getSeatsByStatus('Available');
    const reservedSeats = cinema.getSeatsByStatus('Reserved');
    console.log('Available Seats:', availableSeats.join(', '));
    console.log('Reserved Seats:', reservedSeats.join(', '));
  }
  
  main();
  