import Foundation
import Vision

for path in CommandLine.arguments.dropFirst() {
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = true
    let handler = VNImageRequestHandler(url: URL(fileURLWithPath: path), options: [:])
    do {
        try handler.perform([request])
    } catch {
        FileHandle.standardError.write(Data("OCR error for \(path): \(error)\n".utf8))
        continue
    }

    let lines = (request.results ?? [])
        .sorted {
            if abs($0.boundingBox.midY - $1.boundingBox.midY) > 0.01 {
                return $0.boundingBox.midY > $1.boundingBox.midY
            }
            return $0.boundingBox.minX < $1.boundingBox.minX
        }
        .compactMap { $0.topCandidates(1).first?.string }
    print(lines.joined(separator: "\n"))
    print("\n\u{000C}\n")
}
