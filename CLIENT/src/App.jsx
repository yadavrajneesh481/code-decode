import React, { useState, useRef } from 'react';
import axios from "axios";
import "./App.css";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";

function App() {
    const [codeInput, setCodeInput] = useState("// Write your code here...");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState("javascript");
    const editorRef = useRef(null);
    const monacoRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        // Enhanced editor options
        editor.updateOptions({
            fontSize: 14,
            fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
            fontLigatures: true,
            minimap: { enabled: true },
            lineNumbers: "on",
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            
            // Enhanced autocomplete settings
            suggestOnTriggerCharacters: true,
            quickSuggestions: {
                other: true,
                comments: true,
                strings: true
            },
            quickSuggestionsDelay: 10,
            
            // IntelliSense settings
            parameterHints: {
                enabled: true,
                cycle: true
            },
            suggestSelection: "first",
            acceptSuggestionOnEnter: "on",
            acceptSuggestionOnCommitCharacter: true,
            snippetSuggestions: "top",
            
            // Code formatting
            formatOnPaste: true,
            formatOnType: true,
            autoIndent: "full",
            
            // Bracket matching
            matchBrackets: "always",
            bracketPairColorization: {
                enabled: true
            },
            
            // Code lens
            codeLens: true,
            
            // Hover hints
            hover: {
                enabled: true,
                delay: 300
            },
            
            // Smooth scrolling
            smoothScrolling: true,
            
            // Cursor settings
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            
            // Selection
            selectionHighlight: true,
            occurrencesHighlight: true,
            
            // Folding
            folding: true,
            foldingStrategy: "indentation",
            showFoldingControls: "always",
            
            // Sticky scroll
            stickyScroll: {
                enabled: true
            }
        });

        // Add custom JavaScript/TypeScript snippets and completions
        if (language === "javascript" || language === "typescript") {
            monaco.languages.registerCompletionItemProvider(language, {
                provideCompletionItems: (model, position) => {
                    const suggestions = [
                        {
                            label: 'console.log',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'console.log(${1:object});',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Log output to console',
                            range: {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endColumn: position.column
                            }
                        },
                        {
                            label: 'async function',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'async function ${1:functionName}(${2:params}) {\n\t${3:// code}\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Create async function',
                            range: {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endColumn: position.column
                            }
                        },
                        {
                            label: 'try-catch',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'try {\n\t${1:// code}\n} catch (${2:error}) {\n\t${3:console.error(error);}\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Try-catch block',
                            range: {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endColumn: position.column
                            }
                        },
                        {
                            label: 'arrow function',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'const ${1:functionName} = (${2:params}) => {\n\t${3:// code}\n};',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Arrow function',
                            range: {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endColumn: position.column
                            }
                        },
                        {
                            label: 'forEach',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '${1:array}.forEach((${2:item}) => {\n\t${3:// code}\n});',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'forEach loop',
                            range: {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endColumn: position.column
                            }
                        },
                        {
                            label: 'map',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '${1:array}.map((${2:item}) => ${3:item});',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Map array',
                            range: {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endColumn: position.column
                            }
                        },
                        {
                            label: 'filter',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '${1:array}.filter((${2:item}) => ${3:condition});',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Filter array',
                            range: {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endColumn: position.column
                            }
                        },
                        {
                            label: 'promise',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'new Promise((resolve, reject) => {\n\t${1:// code}\n});',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Create Promise',
                            range: {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endColumn: position.column
                            }
                        },
                        {
                            label: 'fetch',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'fetch(${1:url})\n\t.then(response => response.json())\n\t.then(data => ${2:console.log(data)})\n\t.catch(error => console.error(error));',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Fetch API call',
                            range: {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endColumn: position.column
                            }
                        }
                    ];
                    return { suggestions };
                }
            });
        }

        // Add Python snippets
        if (language === "python") {
            monaco.languages.registerCompletionItemProvider(language, {
                provideCompletionItems: (model, position) => {
                    const suggestions = [
                        {
                            label: 'def',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'def ${1:function_name}(${2:params}):\n\t${3:pass}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Define function',
                            range: {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endColumn: position.column
                            }
                        },
                        {
                            label: 'class',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'class ${1:ClassName}:\n\tdef __init__(self${2:, params}):\n\t\t${3:pass}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Define class',
                            range: {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endColumn: position.column
                            }
                        },
                        {
                            label: 'try-except',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'try:\n\t${1:pass}\nexcept ${2:Exception} as ${3:e}:\n\t${4:print(e)}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Try-except block',
                            range: {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endColumn: position.column
                            }
                        }
                    ];
                    return { suggestions };
                }
            });
        }

        // Enable automatic type acquisition for JavaScript/TypeScript
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false
        });

        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2020,
            allowNonTsExtensions: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            esModuleInterop: true,
            jsx: monaco.languages.typescript.JsxEmit.React,
            allowJs: true,
            typeRoots: ["node_modules/@types"]
        });

        // Add keyboard shortcuts
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            console.log('Save triggered');
            // Add save functionality if needed
        });

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
            handleExplain();
        });
    };

    const handleEditorChange = (value) => {
        setCodeInput(value || "");
    };

    const handleExplain = async () => {
        setLoading(true);
        const API = import.meta.env.VITE_API_BASE_URL;

        try {
            const res = await axios.post(
                `${API}/api/explain/code`,
                { code: codeInput },
                { headers: { "Content-Type": "application/json" } }
            );

            setResponse(
                res.data?.output ||
                res.data?.explanation ||
                "⚠ No explanation returned"
            );
        } catch (error) {
            console.error("Error:", error);
            setResponse("⚠ Error: Failed to get AI response");
        } finally {
            setLoading(false);
        }
    };

    const handleFormat = () => {
        if (editorRef.current) {
            editorRef.current.getAction('editor.action.formatDocument').run();
        }
    };

    const languages = [
        { value: "javascript", label: "JavaScript" },
        { value: "typescript", label: "TypeScript" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
        { value: "cpp", label: "C++" },
        { value: "csharp", label: "C#" },
        { value: "html", label: "HTML" },
        { value: "css", label: "CSS" },
        { value: "json", label: "JSON" },
        { value: "php", label: "PHP" },
        { value: "go", label: "Go" },
        { value: "rust", label: "Rust" },
        { value: "sql", label: "SQL" },
    ];

    return (
        <div className="wrapper">
            <div className="topbar">
                <div className="logo">⚡ Code Explainer IDE</div>
                <div style={{ display: "flex", gap: "19px" }}>
                    <button className='btn'>
                        <a href="https://rajneeshlearn.netlify.app/" style={{ color: "white", textDecoration: "none", display: "flex", width: "100%", height: "100%" }}>
                            Home
                        </a>
                    </button>
                </div>
            </div>

            <div className="card-container">
                <div className="input-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <div className="subtitle">Code Editor</div>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <button 
                                className="btn"
                                onClick={handleFormat}
                                style={{ padding: "5px 15px", fontSize: "12px" }}
                            >
                                Format Code
                            </button>
                            <select 
                                className="language-select"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                {languages.map(lang => (
                                    <option key={lang.value} value={lang.value}>
                                        {lang.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="editor-wrapper">
                        <Editor
                            height="500px"
                            language={language}
                            value={codeInput}
                            theme="vs-dark"
                            onChange={handleEditorChange}
                            onMount={handleEditorDidMount}
                            options={{
                                selectOnLineNumbers: true,
                                roundedSelection: false,
                                readOnly: false,
                                cursorStyle: 'line',
                                automaticLayout: true,
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <button
                            className="btn"
                            onClick={handleExplain}
                            disabled={loading || !codeInput.trim()}
                            style={{ flex: 1 }}
                        >
                            {loading ? "⏳ thinking..." : "Explain Code (Ctrl+Enter)"}
                        </button>
                    </div>
                </div>

                <div className="output-card">
                    <div className="subtitle">AI Explanation</div>
                    <div className="explanation-output">
                        <ReactMarkdown>{response}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;