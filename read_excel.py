import pandas as pd

xl = pd.ExcelFile(r'c:\exacta\galp-simbio\cenarios-validacao-simulador-v1.xlsx')

with open('excel_analysis.txt', 'w', encoding='utf-8') as f:
    f.write(f'Sheets: {xl.sheet_names}\n')
    
    for name in xl.sheet_names:
        f.write(f'\n{"="*80}\n=== {name} ===\n{"="*80}\n')
        df = pd.read_excel(xl, name)
        f.write(f'Columns: {list(df.columns)}\n')
        f.write(f'Shape: {df.shape}\n\n')
        f.write(df.to_string())
        f.write('\n')

print('Saved to excel_analysis.txt')
