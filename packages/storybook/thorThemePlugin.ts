import type {Plugin} from "vite";

import MagicString from "magic-string";
import {ProgramNode} from "rollup";

export const thorThemePlugin = (): Plugin => {
  return {
    name: "thorThemePlugin",
    transform: function (src, id) {
      if (!id.includes("heroui/packages/components/input/src/index.ts")) {
        return src;
      }

      const ast: ProgramNode = this.parse(src);
      const str = new MagicString(src);

      const imports: [string, string][] = [];

      ast.body.forEach((node) => {
        if (node.type === "ImportDeclaration") {
          node.specifiers.forEach((s) => {
            if (s.type === "ImportDefaultSpecifier") {
              const originalName = s.local.name;
              const changedName = `OriginalHero${s.local.name}`;

              // @ts-ignore
              str.update(s.local.start, s.local.end, changedName);
              imports.push([originalName, changedName]);
            }
          });
        }
      });

      const lastImport = [...ast.body].reverse().find((node) => {
        return node.type === "ImportDeclaration";
      });

      // @ts-ignore
      const end = lastImport.end;

      str.prependRight(
        end,
        `\nimport { ${imports
          .map((i) => `extend${i[0]}`)
          .join(", ")} } from "../../../overrides/components/input";\n`,
      );

      imports.forEach(([originalName, changedName]) => {
        str.appendRight(end, `const ${originalName} = extend${originalName}(${changedName});\n`);
      });

      console.log(str.toString());

      return {
        code: str.toString(),
        map: str.generateMap(),
      };
    },
  };
};
