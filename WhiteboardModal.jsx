import React, { useRef, useState, useEffect } from 'react';
import { 
  PenTool, Eraser, Square, StickyNote, Trash2, Download, 
  Send, X, RotateCcw, Palette
} from 'lucide-react';

export default function WhiteboardModal({
  isOpen,
  onClose,
  onSendDrawingToChat
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen'); // 'pen' | 'highlighter' | 'eraser'
  const [color, setColor] = useState('#a855f7');
  const [lineWidth, setLineWidth] = useState(4);
  const [stickyText, setStickyText] = useState('');
  const [stickies, setStickies] = useState([
    { id: 1, text: 'Frontend Architecture Review 🎯', x: 60, y: 70, color: '#fef08a' }
  ]);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.parentElement.clientWidth || 800;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (tool === 'eraser') {
      ctx.strokeStyle = '#181028';
      ctx.lineWidth = lineWidth * 3;
    } else if (tool === 'highlighter') {
      ctx.strokeStyle = color + '66'; // transparent
      ctx.lineWidth = lineWidth * 2.5;
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    }

    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setStickies([]);
    }
  };

  const handleAddSticky = () => {
    if (!stickyText.trim()) return;
    setStickies((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: stickyText.trim(),
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 150,
        color: ['#fef08a', '#fbcfe8', '#bae6fd', '#bbf7d0'][Math.floor(Math.random() * 4)]
      }
    ]);
    setStickyText('');
  };

  const handleShareToChat = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    if (onSendDrawingToChat) {
      onSendDrawingToChat(dataUrl);
    }
    onClose();
  };

  return (
    <div className="modal-backdrop-generic" onClick={onClose}>
      <div className="whiteboard-dialog-window" onClick={(e) => e.stopPropagation()}>
        {/* Header Toolbar */}
        <div className="whiteboard-toolbar-header">
          <div className="wb-left-tools">
            <button
              type="button"
              className={`wb-tool-btn ${tool === 'pen' ? 'active' : ''}`}
              onClick={() => setTool('pen')}
              title="Pen"
            >
              <PenTool size={18} />
            </button>
            <button
              type="button"
              className={`wb-tool-btn ${tool === 'eraser' ? 'active' : ''}`}
              onClick={() => setTool('eraser')}
              title="Eraser"
            >
              <Eraser size={18} />
            </button>

            {/* Colors */}
            <div className="wb-color-picker-row">
              {['#a855f7', '#3b82f6', '#10b981', '#f43f5e', '#f59e0b', '#ffffff'].map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`wb-color-dot ${color === c ? 'selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => {
                    setColor(c);
                    setTool('pen');
                  }}
                />
              ))}
            </div>

            {/* Line width */}
            <input
              type="range"
              min="2"
              max="16"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="wb-stroke-slider"
              title="Line thickness"
            />
          </div>

          <div className="wb-right-actions">
            <button
              type="button"
              className="wb-action-btn"
              onClick={handleClear}
              title="Clear Canvas"
            >
              <Trash2 size={16} />
              <span>Clear</span>
            </button>
            <button
              type="button"
              className="wb-send-chat-btn"
              onClick={handleShareToChat}
            >
              <Send size={15} />
              <span>Share to Chat</span>
            </button>
            <button type="button" className="dialog-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="whiteboard-canvas-stage">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="interactive-canvas"
          />

          {/* Sticky notes overlay */}
          {stickies.map((s) => (
            <div
              key={s.id}
              className="canvas-sticky-note"
              style={{
                top: `${s.y}px`,
                left: `${s.x}px`,
                backgroundColor: s.color
              }}
            >
              <p>{s.text}</p>
            </div>
          ))}
        </div>

        {/* Sticky Note Creator Footer */}
        <div className="whiteboard-footer-bar">
          <div className="sticky-input-row">
            <StickyNote size={18} className="sticky-icon" />
            <input
              type="text"
              placeholder="Add sticky note to whiteboard..."
              value={stickyText}
              onChange={(e) => setStickyText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSticky()}
            />
            <button type="button" className="btn-add-sticky" onClick={handleAddSticky}>
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
