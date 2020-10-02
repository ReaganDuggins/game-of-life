class Rules {
    static survivesThisGeneration(cell, neighbors) {
        let livingNeighbors = this.countLiving(neighbors);

        if(this.isUnderpopulated(livingNeighbors)) {
            return false;
        }

        if(this.isOverpopulated(livingNeighbors)) {
            return false;
        }

        if(this.isEquilibrious(livingNeighbors)) {
            return cell.alive;
        }

        return true;

    }

    static isUnderpopulated(livingNeighbors) {
        return livingNeighbors < 2
    }

    static isOverpopulated(livingNeighbors) {
        return livingNeighbors > 3;
    }

    static isEquilibrious(livingNeighbors) {
        return livingNeighbors === 2;
    }

    static countLiving(neighbors) {
        if(!neighbors) {
            return 0;
        }

        let living = 0;
        neighbors.forEach((cell) => {
            if(cell.alive) {
                living++;
            }
        });
        return living;
    }
}

module.exports = Rules;