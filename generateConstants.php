<?php

if (!\file_exists('option.xml')) {
    echo "option.xml not found.";

    exit(0);
}

$xmlString = \file_get_contents('option.xml');

try {
    $xml = new \SimpleXMLElement($xmlString);
} catch (\Exception $e) {
    exit(0);
}

$namespaces = $xml->getNamespaces(true);
$xml->registerXPathNamespace('ns', $namespaces['']);

$constants = ["const WCF_N = 1;"];

foreach ($xml->xpath('//ns:import/ns:options/ns:option') as $option) {
    $name = \strtoupper(\str_replace(['.', ':'], '_', (string)$option['name']));
    $defaultValue = (string)$option->defaultvalue;
    $optionType = (string)$option->optiontype;

    if ($defaultValue === '') {
        $constants[] = "const {$name} = '';";
    } elseif ($optionType === 'boolean' || $optionType === 'integer') {
        $constants[] = "const {$name} = " . (int)$defaultValue . ";";
    } else {
        $constants[] = "const {$name} = '{$defaultValue}';";
    }
}

\file_put_contents('constants.php', "<?php\n\n" . \implode("\n", $constants) . "\n");

echo "constants.php has been generated successfully.";
