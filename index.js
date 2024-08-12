const fs = require('fs');

function generateNASM(json) {
    let nasmCode = '';

    json.instructions.forEach(instr => {
        let line = '';

        // Handle comments that are standalone lines
        if (instr.comment && !instr.opcode && !instr.directive && !instr.label && !instr.special_inst) {
            nasmCode += `; ${instr.comment}\n`;
            return;
        }

        // Handle labels (labels should be on their own line)
        if (instr.label) {
            nasmCode += `${instr.label}:\n`;
        }

        // Handle directives
        if (instr.directive) {
            line += instr.directive;
            if (instr.operands && instr.operands.length > 0) {
                // Special handling for 'times' directive, which should not have a comma
                if (instr.directive === 'times') {
                    line += ' ' + instr.operands.join(' ');
                } else {
                    line += ' ' + instr.operands.join(', ');
                }
            }
        }

        if(instr.special_inst) {
            switch (instr.special_inst) {
                case 'sign':
                    line += 'times 510-($-$$) db 0\n';
                    line += 'dw 0xaa55\n';
                    break;
                default:
                    break;
            }
        }

        // Handle opcodes
        if (instr.opcode) {
            line += instr.opcode;
            if (instr.operands && instr.operands.length > 0) {
                line += ' ' + instr.operands.join(', ');
            }
        }

        // Attach comments to the end of the line if they exist
        if (instr.comment && instr.opcode) {
            line += ' ; ' + instr.comment;
        }

        // Add the line to the NASM code
        nasmCode += line + '\n';
    });

    return nasmCode;
}

// Example JSON input
const json = JSON.parse(fs.readFileSync('input.json'));

// Generate NASM code
const nasmCode = generateNASM(json);

// Output NASM code
console.log(nasmCode);

fs.writeFileSync('output.nasm', nasmCode);