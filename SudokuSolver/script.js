 // Initialize the grid
        function initGrid() {
            const grid = document.getElementById('sudokuGrid');
            grid.innerHTML = '';
            
            for (let i = 0; i < 81; i++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.className = 'sudoku-cell user-input';
                input.id = `cell-${i}`;
                
                input.addEventListener('input', function(e) {
                    const value = e.target.value;
                    if (value && (isNaN(value) || value < 1 || value > 9)) {
                        e.target.value = '';
                    }
                });
                
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Backspace' || e.key === 'Delete') {
                        e.target.value = '';
                    }
                });
                
                grid.appendChild(input);
            }
        }

        // Get the current board state
        function getBoard() {
            const board = [];
            for (let i = 0; i < 9; i++) {
                board[i] = [];
                for (let j = 0; j < 9; j++) {
                    const cell = document.getElementById(`cell-${i * 9 + j}`);
                    board[i][j] = cell.value === '' ? 0 : parseInt(cell.value);
                }
            }
            return board;
        }

        // Set the board state
        function setBoard(board, markSolved = false) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    const cell = document.getElementById(`cell-${i * 9 + j}`);
                    const value = board[i][j];
                    
                    if (value !== 0) {
                        cell.value = value;
                        if (markSolved) {
                            cell.classList.add('solved');
                        }
                    }
                }
            }
        }

        // Check if placing a number is valid
        function isValid(board, row, col, num) {
            // Check row
            for (let x = 0; x < 9; x++) {
                if (board[row][x] === num) {
                    return false;
                }
            }
            
            // Check column
            for (let x = 0; x < 9; x++) {
                if (board[x][col] === num) {
                    return false;
                }
            }
            
            // Check 3x3 box
            const boxRow = Math.floor(row / 3) * 3;
            const boxCol = Math.floor(col / 3) * 3;
            
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[boxRow + i][boxCol + j] === num) {
                        return false;
                    }
                }
            }
            
            return true;
        }

        // Backtracking algorithm to solve Sudoku
        function solve(board) {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (board[row][col] === 0) {
                        for (let num = 1; num <= 9; num++) {
                            if (isValid(board, row, col, num)) {
                                board[row][col] = num;
                                
                                if (solve(board)) {
                                    return true;
                                }
                                
                                board[row][col] = 0;
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }

        // Validate the current grid
        function validateGrid() {
            const board = getBoard();
            let isValidPuzzle = true;
            
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (board[i][j] !== 0) {
                        const num = board[i][j];
                        board[i][j] = 0;
                        
                        if (!isValid(board, i, j, num)) {
                            isValidPuzzle = false;
                            break;
                        }
                        
                        board[i][j] = num;
                    }
                }
                if (!isValidPuzzle) break;
            }
            
            showMessage(
                isValidPuzzle ? 'Puzzle is valid! ✓' : 'Invalid puzzle! Please check for conflicts.',
                isValidPuzzle ? 'success' : 'error'
            );
        }

        // Solve the Sudoku puzzle
        function solveSudoku() {
            const board = getBoard();
            const originalBoard = JSON.parse(JSON.stringify(board));
            
            // Check if puzzle has any numbers
            const hasInput = board.some(row => row.some(cell => cell !== 0));
            if (!hasInput) {
                showMessage('Please enter some numbers first!', 'error');
                return;
            }
            
            // Validate before solving
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (board[i][j] !== 0) {
                        const num = board[i][j];
                        board[i][j] = 0;
                        
                        if (!isValid(board, i, j, num)) {
                            showMessage('Invalid puzzle! Please check for conflicts.', 'error');
                            return;
                        }
                        
                        board[i][j] = num;
                    }
                }
            }
            
            if (solve(board)) {
                // Clear all cells first
                clearGrid();
                
                // Set original numbers (not marked as solved)
                for (let i = 0; i < 9; i++) {
                    for (let j = 0; j < 9; j++) {
                        if (originalBoard[i][j] !== 0) {
                            const cell = document.getElementById(`cell-${i * 9 + j}`);
                            cell.value = originalBoard[i][j];
                        }
                    }
                }
                
                // Set solved numbers (marked as solved)
                for (let i = 0; i < 9; i++) {
                    for (let j = 0; j < 9; j++) {
                        if (originalBoard[i][j] === 0 && board[i][j] !== 0) {
                            const cell = document.getElementById(`cell-${i * 9 + j}`);
                            cell.value = board[i][j];
                            cell.classList.add('solved');
                        }
                    }
                }
                
                showMessage('Puzzle solved successfully! 🎉', 'success');
            } else {
                showMessage('No solution exists for this puzzle!', 'error');
            }
        }

        // Clear the grid
        function clearGrid() {
            for (let i = 0; i < 81; i++) {
                const cell = document.getElementById(`cell-${i}`);
                cell.value = '';
                cell.classList.remove('solved');
            }
            hideMessage();
        }

        // Show message
        function showMessage(text, type) {
            const message = document.getElementById('message');
            message.textContent = text;
            message.className = `message ${type}`;
            message.style.display = 'block';
        }

        // Hide message
        function hideMessage() {
            const message = document.getElementById('message');
            message.style.display = 'none';
        }

        // Load example puzzles
        function loadExample(difficulty) {
            clearGrid();
            
            const examples = {
                easy: [
                    [5,3,0,0,7,0,0,0,0],
                    [6,0,0,1,9,5,0,0,0],
                    [0,9,8,0,0,0,0,6,0],
                    [8,0,0,0,6,0,0,0,3],
                    [4,0,0,8,0,3,0,0,1],
                    [7,0,0,0,2,0,0,0,6],
                    [0,6,0,0,0,0,2,8,0],
                    [0,0,0,4,1,9,0,0,5],
                    [0,0,0,0,8,0,0,7,9]
                ],
                medium: [
                    [0,0,0,6,0,0,4,0,0],
                    [7,0,0,0,0,3,6,0,0],
                    [0,0,0,0,9,1,0,8,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,5,0,1,8,0,0,0,3],
                    [0,0,0,3,0,6,0,4,5],
                    [0,4,0,2,0,0,0,6,0],
                    [9,0,3,0,0,0,0,0,0],
                    [0,2,0,0,0,0,1,0,0]
                ],
                hard: [
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,3,0,8,5],
                    [0,0,1,0,2,0,0,0,0],
                    [0,0,0,5,0,7,0,0,0],
                    [0,0,4,0,0,0,1,0,0],
                    [0,9,0,0,0,0,0,0,0],
                    [5,0,0,0,0,0,0,7,3],
                    [0,0,2,0,1,0,0,0,0],
                    [0,0,0,0,4,0,0,0,9]
                ]
            };
            
            setBoard(examples[difficulty]);
            showMessage(`${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} puzzle loaded!`, 'info');
        }

        // Initialize on page load
        window.onload = function() {
            initGrid();
        };