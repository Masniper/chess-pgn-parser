# Chess PGN Parser

A Node.js application to parse Portable Game Notation (PGN) strings into a structured JSON format. This is useful for analyzing and displaying chess games with variations.

## Sample terminal Output

Here is a sample of the chess notation result generated by the application:

![Sample JSON](Images/chess-notation.png)

...

## Features

- Parses PGN strings to extract moves and their variations.
- Converts the parsed moves into a hierarchical JSON format.
- Saves the JSON output to a file for easy review and further processing.

## Prerequisites

Make sure you have Node.js installed on your system. This project uses Node.js modules that require Node.js version 12 or higher.

## Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd <project-directory>
    ```

3. **Install the required dependencies:**

    ```bash
    npm install
    ```

## Usage

1. **Update PGN and FEN Strings:**

   Edit the `pgn` and `initialPosition` variables in `index.js` to use your PGN and FEN 
   strings. The PGN string should represent the chess game you want to analyze, and the FEN 
   string should represent the initial position of the chess board.

2. **Run the script:**

    ```bash
    node index.js
    ```

   This will parse the PGN, generate a JSON file named `parsedMoves.json` containing the 
   structured data, and output the results to the console.

3. **View the results:**

   - Open `parsedMoves.json` to view the parsed moves and variations in JSON format.
   - The console output will include the parsed JSON and the ASCII representation of the final board position.

## Sample JSON Output

Here is a sample of the JSON output generated by the application:

![Sample JSON](Images/json.png)

...

## Code Explanation

- **Dependencies:**
  - `chess.js`: Library for managing chess game logic and board state.
  - `@mliebelt/pgn-parser`: Library for parsing PGN strings into game objects.
  - `fs`: Node.js built-in module for file system operations.

- **Main Functions:**
  - `parseChessNotation(notation)`: Parses the chess notation and generates a hierarchical JSON structure.
  - `convertMoveToObject(id, number, name, player, fen)`: Converts a move into a JSON object with details.

## Troubleshooting

- **Invalid PGN Moves:**

  Ensure your PGN string is correctly formatted. Invalid moves or incorrectly formatted PGNs can cause errors during parsing.

- **Error Writing to File:**

  Check file permissions and ensure the script has write access to the directory where `parsedMoves.json` is being created.

## Contributing

Feel free to fork the repository and submit pull requests. If you find any issues or have suggestions for improvements, please open an issue on the project's GitHub page.

## License

Copyright (c) 2024 Masniper. Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

For more information, please refer to the documentation of the libraries used or the Node.js documentation.
